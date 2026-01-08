// parse-produit/route.ts
export const runtime = "nodejs";

import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import type { Element } from "domhandler";

/* ================= helpers ================= */

function parsePrice(priceStr?: string | null): number | null {
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

function extractPrice($: any, html: string): number | null {
  let price: number | null = null;

  $('script[type="application/ld+json"]').each((_: number, el: Element) => {
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

  const selectors = [
    '[itemprop="price"]',
    '[data-sqe="price"]',
    '.price',
    '.product-price',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
  ];

  for (const sel of selectors) {
    const t = $(sel).attr('content') || $(sel).text();
    if (t) {
      price = parsePrice(t);
      if (price !== null) break;
    }
  }

  return price;
}

async function fetchWithTimeout(url: string, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
    });
  } finally {
    clearTimeout(id);
  }
}

/* ================= route ================= */

export async function POST(req: Request) {
  const { url } = await req.json();

  // 👉 product rỗng để nhập tay
  const manualProduct = {
    link: url,
    title: null,
    description: null,
    price_eur: null,
    size: null,
    image: null,
    manual: true, // 👈 optional flag cho frontend
  };

  if (!url) {
    return NextResponse.json(manualProduct);
  }

  let upstream;
  try {
    upstream = await fetchWithTimeout(url);
  } catch {
    return NextResponse.json(manualProduct);
  }

  // 🚨 WEBSITE CHẶN (403, 401, 429…)
  if (!upstream.ok) {
    console.warn('Blocked by website:', upstream.status);
    return NextResponse.json(manualProduct);
  }

  try {
    const html = await upstream.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      $('h1').first().text() ||
      null;

    const description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      null;

    const imgRaw =
      $('meta[property="og:image"]').attr('content') ||
      $('img').first().attr('src') ||
      null;

    const image = imgRaw
      ? imgRaw.startsWith('//')
        ? 'https:' + imgRaw
        : new URL(imgRaw, url).toString()
      : null;

    const sizeMatch = html.match(/(\d+(\.\d+)?\s?(ml|mL|g|kg|L|l|oz|cl))/i);
    const price_eur = extractPrice($, html);

    return NextResponse.json({
      link: url,
      title: title?.trim() || null,
      description: description?.trim() || null,
      price_eur,
      size: sizeMatch?.[0] || null,
      image,
      manual: false,
    });
  } catch (e) {
    console.error('Parse error:', e);
    return NextResponse.json(manualProduct);
  }
}
