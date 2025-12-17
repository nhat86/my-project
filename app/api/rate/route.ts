// app/api/rate/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Parse số kiểu VCB: "31,726.93" → 31726.93
function parseVCBNumber(value: string | undefined, fallback: number = 0): number {
  if (!value) return fallback;
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  const num = Number(cleaned);
  return isNaN(num) ? fallback : num;
}

// Format VND kiểu "31 700 VND"
function formatVND(value: number): string {
  if (!value) value = 30000; // fallback
  const rounded = Math.round(value / 100) * 100;
  return rounded.toLocaleString('vi-VN') + " VND";
}

// Format tỷ giá kiểu "31,73" (chia 1000, 2 chữ số thập phân)
function formatRate(value: number): string {
  return (value / 1000).toFixed(2).replace(".", ",");
}

export async function GET() {
  const DEFAULT_SELL = 30000;

  try {
    const res = await fetch(
      "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx",
      { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0" } }
    );

    if (!res.ok) throw new Error("Không tải được dữ liệu Vietcombank");

    const xml = await res.text();

    const $ = cheerio.load(xml, { xmlMode: true });

    let rateResult = {
      currency: "EUR",
      buy: 0,
      transfer: 0,
      sell: DEFAULT_SELL,
      buyDisplay: "0,00",
      transferDisplay: "0,00",
      sellDisplay: formatRate(DEFAULT_SELL),
      sellVND: formatVND(DEFAULT_SELL),
    };

    // Duyệt từng Exrate
    $("Exrate").each((_, el) => {
      const code = $(el).attr("CurrencyCode");
      if (code === "EUR") {
        const buyRaw = parseVCBNumber($(el).attr("Buy"));
        const transferRaw = parseVCBNumber($(el).attr("Transfer"));
        // Nếu Sell rỗng, fallback = Transfer
        const sellRaw = parseVCBNumber($(el).attr("Sell"), transferRaw || DEFAULT_SELL);

        rateResult = {
          currency: "EUR",
          buy: buyRaw,
          transfer: transferRaw,
          sell: sellRaw,
          buyDisplay: formatRate(buyRaw),
          transferDisplay: formatRate(transferRaw),
          sellDisplay: formatRate(sellRaw),
          sellVND: formatVND(sellRaw),
        };
      }
    });

    return NextResponse.json({
      bank: "Vietcombank",
      ...rateResult,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    const fallbackVND = formatVND(DEFAULT_SELL);
    return NextResponse.json(
      {
        error: true,
        message: error.message || "Lỗi lấy tỷ giá Vietcombank",
        bank: "Vietcombank",
        currency: "EUR",
        buy: 0,
        transfer: 0,
        sell: DEFAULT_SELL,
        buyDisplay: "0,00",
        transferDisplay: "0,00",
        sellDisplay: formatRate(DEFAULT_SELL),
        sellVND: fallbackVND,
        updatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
