import * as cheerio from "cheerio";

export type Product = {
  title: string | null;
  description: string | null;
  price_eur: number | null;
  size: string | null;
  image: string | null;
  source: string;
};

// parse price string -> number
export function parsePrice(priceStr: string | undefined | null): number | null {
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

// parse size from HTML
export function parseSize(html: string): string | null {
  const sizeRegex = /(\d+(\.\d+)?\s?(ml|mL|g|kg|L|l|oz|cl))/gi;
  const matches = html.match(sizeRegex);
  return matches && matches.length > 0 ? matches[0] : null;
}

// --- parsers for specific sites ---

export function parseSephora($: cheerio.CheerioAPI, url: string): Product {
  const title = $('meta[property="og:title"]').attr('content') ?? $('title').text() ?? null;
  const description = $('meta[name="description"]').attr('content') ?? $('p').first().text() ?? null;
  const image = $('meta[property="og:image"]').attr('content') ?? null;
  const price = parsePrice($.html()) ?? null;

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}

export function parseNocibe($: cheerio.CheerioAPI, url: string): Product {
  const title = $('meta[property="og:title"]').attr('content') ?? $('h1').first().text() ?? null;
  const priceStr = $('.price, [data-price]').first().text() ?? $('[data-price]').attr('data-price') ?? null;
  const price = parsePrice(priceStr);
  const description = $('meta[name="description"]').attr('content') ?? $('.product-description').text() ?? null;
  const image = $('meta[property="og:image"]').attr('content') ?? $('img').first().attr('src') ?? null;

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}

export function parseShopee($: cheerio.CheerioAPI, url: string): Product {
  const title = $('meta[property="og:title"]').attr('content') ?? $('title').text() ?? null;
  const priceStr = $('[itemprop="price"]').attr('content') ?? $('[data-sqe="price"]').text() ?? null;
  const price = parsePrice(priceStr);
  const description = $('meta[property="og:description"]').attr('content') ?? $('p').first().text() ?? null;
  const image = $('meta[property="og:image"]').attr('content') ?? $('img').first().attr('src') ?? null;

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}

export function parseLazada($: cheerio.CheerioAPI, url: string): Product {
  const title = $('h1').first().text() ?? $('meta[property="og:title"]').attr('content') ?? null;
  const priceStr = $('.pdp-price').first().text() ?? null;
  const price = parsePrice(priceStr);
  const description = $('meta[property="og:description"]').attr('content') ?? null;
  const image = $('meta[property="og:image"]').attr('content') ?? $('img').first().attr('src') ?? null;

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}

export function parseAmazon($: cheerio.CheerioAPI, url: string): Product {
  const title = $('#productTitle').text() ?? $('meta[property="og:title"]').attr('content') ?? null;
  const priceStr = $('#priceblock_ourprice, #priceblock_dealprice').text() ?? null;
  const price = parsePrice(priceStr);
  const description = $('#feature-bullets').text() ?? $('meta[name="description"]').attr('content') ?? null;
  const imgData = $('#imgTagWrapperId img').attr('data-a-dynamic-image') ?? null;
  const image = imgData ? new URL(imgData, url).toString() : null;

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image,
    source: url,
  };
}

// --- fallback parser if site not recognized ---
export function parseBySite(url: string, $: cheerio.CheerioAPI): Product {
  const lower = url.toLowerCase();
  if (lower.includes('sephora')) return parseSephora($, url);
  if (lower.includes('nocibe')) return parseNocibe($, url);
  if (lower.includes('shopee')) return parseShopee($, url);
  if (lower.includes('lazada')) return parseLazada($, url);
  if (lower.includes('amazon')) return parseAmazon($, url);

  // fallback heuristics
  const title = $('meta[property="og:title"]').attr('content') ?? $('title').text() ?? $('h1').first().text() ?? null;
  const description = $('meta[name="description"]').attr('content') ?? $('p').first().text() ?? null;
  const image = $('meta[property="og:image"]').attr('content') ?? $('img').first().attr('src') ?? null;
  const priceStr = $('[itemprop="price"], .price, [data-price]').first().attr('content') ?? $('[itemprop="price"], .price, [data-price]').first().text() ?? null;
  const price = parsePrice(priceStr);

  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}
