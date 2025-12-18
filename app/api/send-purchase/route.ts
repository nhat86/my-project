export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { product, quote, customer } = await req.json();

  if (!customer?.name || !customer?.contact) {
    return NextResponse.json({ error: 'Missing customer info' }, { status: 400 });
  }

  // 1️⃣ Lưu vào Supabase
  const { error } = await supabase.from('purchase_requests').insert({
    customer_name: customer.name,
    customer_contact: customer.contact,
    delivery_method: customer.deliveryMethod, // warehouse | home
    home_address: customer.address || null,
    product_title: product.title,
    product_description: product.description,
    product_link: product.link || 'N/A',
    product_size: product.size,
    price_eur: quote.price,
    service_fee: quote.service,
    shipping_fee: quote.shipping,
    total_eur: quote.total,
    exchange_rate: quote.exchangeRate,
    total_vnd: Math.round(quote.total * quote.exchangeRate),
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  // 2️⃣ Gửi mail cho bạn qua Resend
  await resend.emails.send({
    from: 'Báo giá <onboarding@resend.dev>',
    to: [process.env.MY_EMAIL!],
    subject: '🛒 Khách xác nhận mua sản phẩm',
    html: `
      <h2>Khách hàng xác nhận mua sản phẩm</h2>
      <h3>Thông tin khách hàng</h3>
      <p><b>Tên:</b> ${customer.name}</p>
      <p><b>Liên hệ:</b> ${customer.contact}</p>
      <p><b>Hình thức nhận hàng:</b> ${
        customer.deliveryMethod === 'home'
          ? 'Nhận tại nhà'
          : 'Nhận tại kho'
      }</p>
      ${
        customer.deliveryMethod === 'home'
          ? `<p><b>Địa chỉ nhận:</b> ${customer.address}</p>`
          : ''
      }
      <hr/>
      <h3>Thông tin sản phẩm</h3>
      <p><b>Link sản phẩm:</b> <a href="${product.link || '#'}">${product.link || 'N/A'}</a></p>
      <p><b>Title:</b> ${product.title}</p>
      <p><b>Mô tả:</b> ${product.description}</p>
      <p><b>Size:</b> ${product.size || 'N/A'}</p>
      <p><b>Giá gốc:</b> ${quote.price} EUR</p>
      <p><b>Phí dịch vụ:</b> ${quote.service} EUR</p>
      <p><b>Phí vận chuyển:</b> ${quote.shipping} EUR</p>
      <p><b>Tổng:</b> ${quote.total} EUR</p>
      <p><b>Tỷ giá:</b> 1 EUR = ${quote.exchangeRate.toLocaleString('vi-VN')} VND</p>
      <p><b>Tổng quy đổi:</b>
        ${(quote.total * quote.exchangeRate).toLocaleString('vi-VN')} VND
      </p>
    `,
  });

  return NextResponse.json({ success: true });
}
