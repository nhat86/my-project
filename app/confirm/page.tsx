'use client'

import React, { useEffect, useState } from 'react';

export default function ConfirmPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('parsed_product');
    if (raw) setProduct(JSON.parse(raw));
  }, []);

  function calcTotal(p: any) {
    const price = p?.price_eur || 0;
    const service = Math.round(price * 0.1 * 100) / 100;
    const shipping = 15;
    return { price, service, shipping, total: Math.round((price + service + shipping) * 100) / 100 };
  }

  async function sendQuote() {
    if (!product?.price_eur) return;
    setLoading(true); 
    setMessage(null);

    try {
      const payload = { product, quote: calcTotal(product) };
      const res = await fetch('/api/send-quote', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Send failed');

      setMessage('Báo giá đã gửi!');
      sessionStorage.removeItem('parsed_product');
    } catch (e: any) {
      setMessage('Lỗi: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  if (!product) return (
    <div>
      Không có dữ liệu. Quay lại <a className="text-blue-600 underline" href="/link">nhập link</a>.
    </div>
  );

  const q = calcTotal(product);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Xác nhận sản phẩm</h1>
      <div className="bg-white p-4 rounded shadow">
        {/* Hình ảnh sản phẩm */}
        {product.image && (
          <img 
            src={product.image} 
            alt={product.title || 'Product image'} 
            className="w-48 h-48 object-contain mb-4 border rounded" 
          />
        )}

        <h2 className="text-xl font-bold">{product.title}</h2>
        <p className="mt-2">{product.description || "Không có mô tả"}</p>
        <p className="mt-2">Size: {product.size || "Không xác định"}</p>
        <p className="mt-2">Giá gốc (EUR): {product.price_eur || "0"}</p>
        <hr className="my-3" />
        <p>Phí dịch vụ: {q.service} EUR</p>
        <p>Shipping estimate: {q.shipping} EUR</p>
        <p className="font-bold">Tổng dự kiến: {q.total} EUR</p>
        <div className="mt-4 flex gap-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" 
            onClick={sendQuote} 
            disabled={loading || !product?.price_eur}
          >
            {loading ? 'Đang gửi...' : 'Gửi báo giá & email'}
          </button>
        </div>
        {message && <div className="mt-3">{message}</div>}
      </div>
    </div>
  );
}
