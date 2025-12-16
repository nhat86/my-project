export const runtime = "nodejs";

import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

// --- helper parse price string ---
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

// --- extract price fallback (JSON-LD / selectors / regex) ---
function extractPrice($: cheerio.Root, html: string): number | null {
  let price: number | null = null;

  // 1️⃣ JSON-LD
  $('script[type="application/ld+json"]').each((_, el) => {
    if (price !== null) return;
    try {
      const jsonText = $(el).html();
      if (!jsonText) return;
      const data = JSON.parse(jsonText);
      const offer = Array.isArray(data) ? data[0]?.offers : data?.offers;
      if (offer?.price) price = parsePrice(offer.price);
    } catch {}
  });

  if (price !== null) return price;

  // 2️⃣ Common selectors
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

  // 3️⃣ Regex fallback
  const match = html.match(/"price"\s*:\s*"([\d.,]+)"/);
  if (match) price = parsePrice(match[1]);

  return price;
}

// --- get Sephora product ID from URL ---
function getSephoraProductId(url: string): string | null {
  const match = url.match(/-P(\d+)\.html$/);
  return match ? match[1] : null;
}

// --- fetch Sephora API for price ---
async function fetchSephoraPrice(productId: string): Promise<number | null> {
  try {
    const apiUrl = `https://www.sephora.fr/api/catalog/products/${productId}`;
    const res = await fetch(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;

    const data = await res.json();
    const priceStr = data?.offers?.price;
    if (!priceStr) return null;
    return Math.round(parseFloat(priceStr) * 100) / 100;
  } catch {
    return null;
  }
}

// --- route POST ---
export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

    const upstream = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!upstream.ok) return NextResponse.json({ error: 'Failed to fetch url' }, { status: 400 });

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

    const sizeRegex = /(\d+(\.\d+)?\s?(ml|mL|g|kg|L|l|oz|cl))/gi;
    const sizeMatches = html.match(sizeRegex);
    const size = sizeMatches?.[0] || null;

    // --- price ---
    let price_eur: number | null = null;
    const sephoraId = getSephoraProductId(url);
    if (sephoraId) {
      price_eur = await fetchSephoraPrice(sephoraId);
    }
    if (price_eur === null) {
      price_eur = extractPrice($, html);
    }

    const out = {
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
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
