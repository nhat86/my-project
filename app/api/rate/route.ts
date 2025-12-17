// app/api/rate/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const FALLBACK_RATE = 25000; // tỉ giá mặc định nếu API lỗi

  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=VND');
    
    if (!res.ok) {
      console.error('Lỗi fetch exchangerate.host:', res.status, res.statusText);
      return NextResponse.json({ rate: FALLBACK_RATE });
    }

    const data = await res.json();

    if (!data?.rates?.VND) {
      console.error('API trả về không hợp lệ:', data);
      return NextResponse.json({ rate: FALLBACK_RATE });
    }

    return NextResponse.json({ rate: data.rates.VND });
  } catch (err) {
    console.error('Lỗi fetch tỉ giá:', err);
    return NextResponse.json({ rate: FALLBACK_RATE });
  }
}
