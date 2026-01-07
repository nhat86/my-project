import * as cheerio from "cheerio";

export type Product = {
  title: string | null;
  description: string | null;
  price_eur: number | null;
  size: string | null;
  image: string | null;
  source: string;
};

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

// parser cho Sephora
export function parseSephora($: cheerio.CheerioAPI, url: string): Product {
  const title =
  $('meta[property="og:title"]').attr('content')
  ?? $('title').text()
  ?? null;

  const description =
    $('meta[name="description"]').attr('content')
    ?? $('p').first().text()
    ?? null;

  const image =
    $('meta[property="og:image"]').attr('content') ?? null;

  const price = parsePrice($) ?? null;


  return {
    title,
    description,
    price_eur: price,
    size: parseSize($.html()),
    image: image ? new URL(image, url).toString() : null,
    source: url,
  };
}

// parser cho Nocibé
export function parseNocibe($: cheerio.CheerioAPI, url: string): Product {
  const title = $('meta[property="og:title"]').attr('content') || $('h1').first().text();
  const priceStr = $('.price, [data-price]').first().text() || $('[data-price]').attr('data-price');
  const price = parsePrice(priceStr);
  const description = $('meta[name="description"]').attr('content') || $('.product-description').text();
  const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
  return { title, description, price_eur: price, size: parseSize($.html()), image: image ? new URL(image, url).toString() : null, source: url };
}

// parser Shopee
export function parseShopee($: cheerio.CheerioAPI, url: string): Product {
  const title = $('meta[property="og:title"]').attr('content') || $('title').text();
  const priceStr = $('[itemprop="price"]').attr('content') || $('[data-sqe="price"]').text();
  const price = parsePrice(priceStr);
  const description = $('meta[property="og:description"]').attr('content') || $('p').first().text();
  const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
  return { title, description, price_eur: price, size: parseSize($.html()), image: image ? new URL(image, url).toString() : null, source: url };
}

// parser Lazada
export function parseLazada($: cheerio.CheerioAPI, url: string): Product {
  const title = $('h1').first().text() || $('meta[property="og:title"]').attr('content');
  const priceStr = $('.pdp-price').first().text();
  const price = parsePrice(priceStr);
  const description = $('meta[property="og:description"]').attr('content');
  const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
  return { title, description, price_eur: price, size: parseSize($.html()), image: image ? new URL(image, url).toString() : null, source: url };
}

// parser Amazon
export function parseAmazon($: cheerio.CheerioAPI, url: string): Product {
  const title = $('#productTitle').text() || $('meta[property="og:title"]').attr('content');
  const priceStr = $('#priceblock_ourprice, #priceblock_dealprice').text();
  const price = parsePrice(priceStr);
  const description = $('#feature-bullets').text() || $('meta[name="description"]').attr('content');
  const image = $('#imgTagWrapperId img').attr('data-a-dynamic-image');
  return { title, description, price_eur: price, size: parseSize($.html()), image: image ? new URL(image, url).toString() : null, source: url };
}

// helper parse size
export function parseSize(html: string): string | null {
  const sizeRegex = /(\d+(\.\d+)?\s?(ml|mL|g|kg|L|l|oz|cl))/gi;
  const matches = html.match(sizeRegex);
  return matches && matches.length > 0 ? matches[0] : null;
}

// hàm chọn parser theo url
export function parseBySite(url: string, $: cheerio.CheerioAPI): Product {
  const lower = url.toLowerCase();
  if (lower.includes('sephora')) return parseSephora($, url);
  if (lower.includes('nocibe')) return parseNocibe($, url);
  if (lower.includes('shopee')) return parseShopee($, url);
  if (lower.includes('lazada')) return parseLazada($, url);
  if (lower.includes('amazon')) return parseAmazon($, url);

  // fallback heuristics nếu không nhận diện site
  const title = $('meta[property="og:title"]').attr('content') || $('title').text() || $('h1').first().text();
  const description = $('meta[name="description"]').attr('content') || $('p').first().text();
  const image = $('meta[property="og:image"]').attr('content') || $('img').first().attr('src');
  const priceStr = $('[itemprop="price"], .price, [data-price]').first().attr('content') || $('[itemprop="price"], .price, [data-price]').first().text();
  const price = parsePrice(priceStr);
  return { title, description, price_eur: price, size: parseSize($.html()), image: image ? new URL(image, url).toString() : null, source: url };
}
