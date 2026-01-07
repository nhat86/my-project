// parse-produit/route.ts
export const runtime = "nodejs";

import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import type { Element } from "domhandler";

// --- helper function parse price string ---
function parsePrice(priceStr: string | undefined | null): number | null {
  if (!priceStr) return null;

  let cleaned = priceStr.replace(/[^0-9.,]/g, '');
  if (cleaned.match(/\d+\.\d+,\d+/)) {
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.');
  }

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : Math.round(num * 100) / 100;
}

// --- extract price from JSON-LD, selectors, or regex ---
function extractPrice($: any, html: string): number | null {
  let price: number | null = null;

  // 1️⃣ JSON-LD
  $('script[type="application/ld+json"]').each((_: number, el: Element) => {
    if (price !== null) return;
    try {
      const jsonText = $(el).html();
      if (!jsonText) return;
      const data = JSON.parse(jsonText);
      const offer = Array.isArray(data) ? data[0]?.offers : data?.offers;
      if (offer?.price) {
        price = parsePrice(offer.price);
      }
    } catch (e) {
      console.warn('JSON-LD parse error', e);
    }
  });

  if (price !== null) return price;

  // 2️⃣ common selectors
  const priceSelectors = [
    '[itemprop="price"]',
    '[data-sqe="price"]',
    '.price',
    '.product-price',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '[data-at="product_price"]'
  ];

  for (const sel of priceSelectors) {
    const t = $(sel).attr('content') || $(sel).text();
    if (t) {
      price = parsePrice(t);
      if (price !== null) break;
    }
  }

  if (price !== null) return price;

  // 3️⃣ regex fallback
  const match = html.match(/"price"\s*:\s*"([\d.,]+)"/);
  if (match) price = parsePrice(match[1]);

  return price;
}

// --- fetch with timeout & UA ---
async function fetchWithTimeout(url: string, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    console.log('Fetching URL:', url);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
      },
      redirect: 'follow',
      signal: controller.signal
    });

    console.log('Fetch status:', res.status, res.statusText);
    return res;
  } finally {
    clearTimeout(id);
  }
}

// --- route POST ---
export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    let upstream;
    try {
      upstream = await fetchWithTimeout(url);
      if (!upstream.ok) {
        return NextResponse.json({ error: `Failed to fetch url (status ${upstream.status})` }, { status: 400 });
      }
    } catch (e: any) {
      console.error('Fetch error:', e.message);
      return NextResponse.json({ error: 'Failed to fetch url (network error or timeout)' }, { status: 500 });
    }

    const html = await upstream.text();
    const $ = cheerio.load(html);

    // --- parse fields ---
    const title = $('meta[property="og:title"]').attr('content') ||
                  $('title').text() ||
                  $('h1').first().text() || null;

    const description = $('meta[name="description"]').attr('content') ||
                        $('meta[property="og:description"]').attr('content') ||
                        $('p').first().text() || null;

    const imgRaw = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src') || null;
    let image: string | null = null;
    if (imgRaw) {
      image = imgRaw.startsWith('//') ? 'https:' + imgRaw : new URL(imgRaw, url).toString();
    }

    // size detection
    const sizeRegex = /(\d+(\.\d+)?\s?(ml|mL|g|kg|L|l|oz|cl))/gi;
    const sizeMatches = html.match(sizeRegex);
    const size = sizeMatches?.[0] || null;

    // price
    const price_eur = extractPrice($, html);

    const out = {
      link: url,
      title: title?.trim() || null,
      description: description?.trim() || null,
      price_eur,
      size,
      image,
      source: url
    };

    console.log('DEBUG parsed product:', out);
    return NextResponse.json(out);

  } catch (e: any) {
    console.error('Route error:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
