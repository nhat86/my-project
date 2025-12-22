"use client";

import Link from "next/link";
import { categories } from "./data/categories";

export default function Home() {
  const steps = [
    {
      icon: "🛍️",
      title: "Chọn sản phẩm bạn yêu thích",
      description: `Nếu bạn chưa biết mua gì:
- Tìm kiếm bằng AI trên web PhapShopping
- Duyệt theo các chủ đề gợi ý bên dưới
Khi đã chọn sản phẩm, copy link hoặc mô tả gửi cho chúng tôi`,
    },
    {
      icon: "💬",
      title: "Nhận báo giá & xác nhận",
      description: `Chúng tôi sẽ trích xuất thông tin sản phẩm từ link bạn gửi
Gửi báo giá chi tiết nhanh nhất
Bạn kiểm tra và xác nhận đơn hàng`,
    },
    {
      icon: "📦",
      title: "Giao hàng tận tay tại Việt Nam",
      description: `Nhận sản phẩm an toàn, nhanh chóng, ngay tại nhà`,
    },
  ];

  return (
    <main className="px-4 py-8 space-y-16">
      {/* Section 1 */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300 text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Tìm kiếm AI hoặc nhập link</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/search" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">Tìm kiếm bằng AI</h2>
            <p>Người chưa có sản phẩm cụ thể — mô tả, AI gợi ý sản phẩm.</p>
          </Link>
          <Link href="/link" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-2">Nhập link sản phẩm</h2>
            <p>Đã có link: dán link, hệ thống trích xuất dữ liệu.</p>
          </Link>
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-white py-16 px-8 rounded-xl shadow-inner hover:shadow-lg hover:scale-105 transition text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Cách PhapShopping hoạt động – Chỉ 3 bước đơn giản</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg hover:scale-105 transition text-left">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 whitespace-pre-line">{step.description}</p>
            </div>
          ))}
        </div>
        <Link href="/link" className="inline-block mt-4 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Bắt đầu mua ngay
        </Link>
      </section>

      {/* Section 3 */}
      <section className="bg-gradient-to-r from-pink-50 to-orange-50 p-8 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-700">Gợi ý sản phẩm theo chủ đề</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr justify-center gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link key={idx} href={cat.link} className="group relative flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition text-center">
                <Icon className="w-10 h-10 text-pink-500" />
                <span className="mt-4 font-medium text-sm md:text-base">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
