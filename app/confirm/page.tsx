'use client'

import React, { useEffect, useState } from 'react';
import ProductDescription from "@/components/ProductDescription";

export default function ConfirmPage() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null); // tỉ giá EUR -> VND
  const [showContactModal, setShowContactModal] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    contact: '', // email / messenger
  });

  // Fallback tỉ giá nếu API lỗi
  const FALLBACK_RATE = 25000;

  // Load product từ sessionStorage
  useEffect(() => {
    const raw = sessionStorage.getItem('parsed_product');
    if (raw) setProduct(JSON.parse(raw));
  }, []);

  // Lấy tỉ giá từ server + tự động update mỗi 1 ngày
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('/api/rate');
        const data = await res.json();
        if (data.rate) setRate(data.rate);
        else {
          console.error('Tỉ giá không hợp lệ, dùng fallback:', data);
          setRate(FALLBACK_RATE);
        }
      } catch (err) {
        console.error('Lỗi fetch tỉ giá, dùng fallback:', err);
        setRate(FALLBACK_RATE);
      }
    };

    fetchRate();

    // Cập nhật mỗi 24h
    const interval = setInterval(fetchRate, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  function calcTotal(p: any) {
    const price = p?.price_eur || 0;
    const serviceRate = price < 50 ? 0.1 : 0.15;
    const service = Math.round(price * serviceRate * 100) / 100;
    const shipping = 7;
    const total = Math.round((price + service + shipping) * 100) / 100;
    return { price, service, shipping, total };
  }

  const formatVND = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

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

      <div className="bg-yellow-100 p-3 mb-4 rounded border-l-4 border-yellow-400">
        <strong>Lưu ý:</strong> Thông tin sản phẩm được tự động lấy từ web. Nếu size hoặc giá chưa chính xác, vui lòng chỉnh sửa trước khi gửi báo giá.
      </div>

      <div className="bg-white p-4 rounded shadow">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.title || 'Product image'} 
            className="w-48 h-48 object-contain mb-4 border rounded" 
          />
        )}

        <ProductDescription title={product.title} description={product.description} />

        <div className="mb-2 mt-4">
          <label className="font-semibold">Size:</label>
          <input
            type="text"
            value={product.size || ''}
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-2">
          <label className="font-semibold">Giá gốc (EUR):</label>
          <input
            type="number"
            value={product.price_eur || 0}
            onChange={(e) => setProduct({ ...product, price_eur: parseFloat(e.target.value) || 0 })}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <hr className="my-3" />

        <p>Phí dịch vụ: {q.service} EUR {rate && `(${formatVND(q.service * rate)})`}</p>
        <p>Phí vận chuyển ước tính: {q.shipping} EUR {rate && `(${formatVND(q.shipping * rate)})`}</p>
        <p className="font-bold">
          Tổng dự kiến: {q.total} EUR {rate && `(${formatVND(q.total * rate)})`}
        </p>

        <div className="mt-4">
      <button
        className="w-full px-4 py-3 bg-green-600 text-white rounded font-semibold disabled:opacity-50"
        disabled={!product?.price_eur}
        onClick={() => setShowContactModal(true)}
      >
        ✅ Xác nhận mua sản phẩm & nhận báo giá
      </button>
    </div>


        {message && <div className="mt-3">{message}</div>}
      </div>
      {showContactModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        Thông tin liên hệ để gửi báo giá
      </h2>

      <div className="mb-3">
        <label className="font-semibold">Họ và tên *</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">
          Email / Messenger *
        </label>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Ví dụ: email@gmail.com hoặc https://www.facebook.com/profile.php?id=100011111111111"
          value={customer.contact}
          onChange={(e) =>
            setCustomer({ ...customer, contact: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowContactModal(false)}
        >
          Hủy
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={!customer.name || !customer.contact || loading}
          onClick={async () => {
            setLoading(true);
            try {
              await fetch('/api/send-purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  product,
                  quote: calcTotal(product),
                  customer,
                }),
              });

              alert('✅ Đã gửi thông tin! Chúng tôi sẽ liên hệ bạn sớm.');
              sessionStorage.removeItem('parsed_product');
              setShowContactModal(false);
            } catch (err) {
              alert('❌ Có lỗi xảy ra, vui lòng thử lại');
            } finally {
              setLoading(false);
            }
          }}
        >
          Xác nhận & gửi báo giá
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
