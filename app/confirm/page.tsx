'use client'

import React, { useEffect, useState } from 'react';
import ProductDescription from "@/components/ProductDescription";

type Rate = {
  bank: string;
  currency: string;
  buy: number;
  transfer: number;
  sell: number;
};

export default function ConfirmPage() {
  const [product, setProduct] = useState<any>(null);
  const [rate, setRate] = useState<Rate | null>(null);

  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [customer, setCustomer] = useState({
  name: '',
  contact: '',
  deliveryMethod: 'warehouse', // 'warehouse' | 'home'
  address: '',
});


  const FALLBACK_RATE = 30000;

  // Load product từ sessionStorage
  useEffect(() => {
    const raw = sessionStorage.getItem('parsed_product');
    if (raw) setProduct(JSON.parse(raw));
  }, []);

  // Fetch tỷ giá EUR → VND
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('/api/rate');
        const data = await res.json();

        setRate({
          bank: data.bank || 'Vietcombank',
          currency: 'EUR',
          buy: data.buy || 0,
          transfer: data.transfer || 0,
          sell: data.sell*1000 || FALLBACK_RATE,
        });
      } catch {
        setRate({
          bank: 'Vietcombank',
          currency: 'EUR',
          buy: 0,
          transfer: 0,
          sell: FALLBACK_RATE,
        });
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 24 * 60 * 60 * 1000); // 1 ngày
    return () => clearInterval(interval);
  }, []);

  // ---- CALCULATION ----
  function calcTotal(p: any) {
    const price = p?.price_eur || 0;

    // phí phụ thu
    const serviceRate = price < 100 ? 0.1 : 0.15;
    const service = +(price * serviceRate).toFixed(2);

    // vận chuyển quốc tế
    const weightKg = p?.weight_kg || 1;
    const shipping = +(15 * weightKg).toFixed(2);

    const total = +(price + service + shipping).toFixed(2);

    return { price, service, shipping, total };
  }

  const formatVND = (value: number) =>
  value.toLocaleString('vi-VN', {maximumFractionDigits: 0 }) + ' VND';
  
  if (!product) {
    return (
      <div>
        Không có dữ liệu. Quay lại{' '}
        <a className="text-blue-600 underline" href="/link">
          nhập link
        </a>.
      </div>
    );
  }

  const q = calcTotal(product);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Xác nhận sản phẩm</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          {product.image && (
            <img
              src={product.image}
              className="w-48 h-48 object-contain mb-4 border rounded"
            />
          )}

          <ProductDescription
            title={product.title}
            description={product.description}
          />

          <div className="mt-4">
            <label className="font-semibold">Size</label>
            <input
              className="w-full border px-2 py-1 rounded"
              value={product.size || ''}
              onChange={(e) =>
                setProduct({ ...product, size: e.target.value })
              }
            />
          </div>

          <div className="mt-2">
            <label className="font-semibold">Giá gốc (EUR)</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded"
              value={product.price_eur || 0}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price_eur: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <hr className="my-4" />

          <p>
            Phí phụ thu: <strong>{q.service} €</strong>{' '}
            {rate && `(${formatVND(q.service * rate.sell)})`}
          </p>
          <p>
            Phí vận chuyển quốc tế: <strong>{q.shipping} €</strong>{' '}
            {rate && `(${formatVND(q.shipping * rate.sell)})`}
          </p>
          <p className="font-bold text-lg mt-2">
            Tổng dự kiến: {q.total} €{' '}
            {rate && `(${formatVND(q.total * rate.sell)})`}
          </p>

          
        <button
        className="w-full px-4 py-3 bg-green-600 text-white rounded font-semibold disabled:opacity-50"
        disabled={!product?.price_eur}
        onClick={() => setShowContactModal(true)}
      >
        ✅ Xác nhận mua sản phẩm & nhận báo giá
      </button>
      {message && (
        <div className="mb-4 p-3 rounded bg-green-50 border border-green-300 text-green-700">
          {message}
        </div>
      )}
        </div>

        {/* SIDEBAR */}
        <aside className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 text-[13px] text-gray-700 leading-relaxed">
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-gray-900">
            🧾 <span>Giải thích cách tính phí</span>
          </h3>

          {/* TỶ GIÁ */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-blue-700 uppercase">
              💱 Tỷ giá chuyển đổi
            </h4>

            <p> Quy đổi EUR → VND theo tỷ giá hiện tại của Vietcombank.</p>

            {rate?.sell && (
              <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                <span className="text-blue-700 font-semibold">
                  1 EUR = {rate.sell.toLocaleString('vi-VN')} VND
                </span>
              </div>
            )}

            <p className="italic text-gray-500 mt-2">
              Tỷ giá hiển thị <strong>chỉ mang tính tham khảo</strong> và sẽ được{' '}
              <strong>chốt khi xác nhận đơn</strong>.
            </p>
          </div>

          {/* PHÍ PHỤ THU */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-orange-700 uppercase">
              💰 Phí phụ thu dịch vụ
            </h4>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 space-y-1">
              <p>
                🔹 <strong>10%</strong> cho sản phẩm <strong>dưới 100€</strong>
              </p>
              <p>
                🔹 <strong>15%</strong> cho sản phẩm <strong>từ 100€ trở lên</strong>
              </p>
            </div>

            <p className="text-gray-600 mt-2">
              Bao gồm xử lý đơn hàng, kiểm tra sản phẩm, hỗ trợ mua và quản lý vận chuyển.
            </p>
          </div>

          {/* VẬN CHUYỂN */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-green-700 uppercase">
              🚚 Phí vận chuyển
            </h4>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
              <p>
                🌍 <strong>Quốc tế:</strong> <strong>15€/kg</strong>
              </p>

              <p>
                🏬 <strong>Nhận tại kho TP. HCM:</strong>{' '}
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  MIỄN PHÍ
                </span>
              </p>

              <p>
                🚚 <strong>Giao tận nhà:</strong>{' '}
                <strong>20.000 – 50.000 VNĐ/kg</strong>
                <br />
                <span className="text-gray-600">
                  (tùy khu vực giao hàng)
                </span>
              </p>
            </div>
          </div>
        </aside>
      </div>
      {/* ================= MODAL ================= */}
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
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold">Email / Messenger *</label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={customer.contact}
                onChange={(e) =>
                  setCustomer({ ...customer, contact: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="font-semibold block mb-2">
                Hình thức nhận hàng *
              </label>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="warehouse"
                    checked={customer.deliveryMethod === 'warehouse'}
                    onChange={() =>
                      setCustomer({ ...customer, deliveryMethod: 'warehouse', address: '' })
                    }
                  />
                  Nhận tại kho TP.HCM
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="home"
                    checked={customer.deliveryMethod === 'home'}
                    onChange={() =>
                      setCustomer({ ...customer, deliveryMethod: 'home' })
                    }
                  />
                  Gửi về nhà
                </label>
              </div>
            </div>
            {customer.deliveryMethod === 'home' && (
              <div className="mb-4">
                <label className="font-semibold">Địa chỉ nhận hàng *</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Ví dụ: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                />
              </div>
            )}


            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowContactModal(false)}
                disabled={loading}
              >
                Hủy
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={!customer.name || !customer.contact || loading ||
  (customer.deliveryMethod === 'home' && !customer.address)}
                onClick={async () => {
                  setLoading(true);
                  setMessage(null);

                  try {
                    const res = await fetch('/api/send-purchase', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        product,
                        quote: calcTotal(product),
                        customer,
                      }),
                    });

                    if (!res.ok) throw new Error();

                    setMessage(
                      '✅ Đã gửi thông tin! Chúng tôi sẽ liên hệ bạn sớm.'
                    );
                    sessionStorage.removeItem('parsed_product');
                    setShowContactModal(false);
                    setCustomer({ name: '', contact: '' });
                  } catch {
                    setMessage('❌ Có lỗi xảy ra, vui lòng thử lại.');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? 'Đang gửi...' : 'Xác nhận & gửi báo giá'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
