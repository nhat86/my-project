"use client";

import Link from "next/link";
import { categories } from "./data/categories";
import WinterPopup from "../components/PopupWinterSale";
export default function Home() {
  const steps = [
    {
      icon: "🛍️",
      title: "Chọn sản phẩm",
      description:
        "Tìm bằng AI hoặc duyệt theo các chủ đề gợi ý. Khi có sản phẩm, chỉ cần copy link gửi cho chúng tôi.",
    },
    {
      icon: "💬",
      title: "Nhận báo giá",
      description:
        "Chúng tôi trích xuất thông tin từ link và gửi báo giá chi tiết để bạn xác nhận.",
    },
    {
      icon: "📦",
      title: "Giao tận tay",
      description:
        "Hàng được mua trực tiếp từ Pháp và giao đến tận nhà tại Việt Nam.",
    },
  ];

  return (
    <main className="px-4 py-12 space-y-20">
{/*<WinterPopup />*}
{/* ================= WINTER SALE BANNER ================= */}
<section className="bg-blue-50 p-6 rounded-2xl text-center max-w-5xl mx-auto mb-12 relative">
  <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
    ❄️ Khuyến mãi mùa đông từ Pháp – Giảm tới 50%-70%!
  </h2>
  <p className="text-slate-700 mb-4">
    Diễn ra từ thứ Tư, 7 tháng 1 đến thứ Ba, 3 tháng 2 năm 2026 – Đừng bỏ lỡ!
  </p>
</section>


      {/* ================= HERO ================= */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          🔥 Mua hộ hàng Pháp chính hãng – <br className="hidden md:block" />
          Gửi về Việt Nam dễ dàng
        </h1>

        <p className="text-base md:text-lg text-slate-600">
          Tìm sản phẩm bằng AI hoặc dán link trực tiếp từ website Pháp –{" "}
          <span className="font-medium text-slate-800">
            báo giá nhanh, giao tận tay
          </span>
        </p>

        <p className="text-sm text-slate-500">
          🇫🇷 Mua trực tiếp tại Pháp · 💬 Hỗ trợ tiếng Việt · 📦 Giao tận nhà
        </p>
      </section>

      {/* ================= PRIMARY ACTION ================= */}
      <section className="bg-blue-50 p-8 rounded-2xl text-center max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-slate-900">
          Bắt đầu mua hàng ngay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI SEARCH */}
          <Link
            href="/search"
            className="
              group relative
              p-6 bg-white rounded-xl
              border border-slate-200
              transition-all duration-200 ease-out
              hover:border-blue-500
              hover:shadow-lg
              hover:-translate-y-1
              text-left
            "
          >
            <h3 className="
              text-xl font-semibold mb-2
              text-slate-900
              transition-colors
              group-hover:text-blue-600
            ">
              🤖 Tìm kiếm bằng AI
            </h3>

            <p className="text-slate-600">
              Chưa biết mua gì? Mô tả nhu cầu, AI gợi ý sản phẩm phù hợp.
            </p>

            <span className="
              inline-block mt-4 text-sm font-medium text-blue-600
              opacity-0 translate-y-1
              group-hover:opacity-100 group-hover:translate-y-0
              transition
            ">
              Bắt đầu ngay →
            </span>
          </Link>

          {/* LINK */}
          <Link
            href="/link"
            className="
              group relative
              p-6 bg-white rounded-xl
              border border-slate-200
              transition-all duration-200 ease-out
              hover:border-blue-500
              hover:shadow-lg
              hover:-translate-y-1
              text-left
            "
          >
            <h3 className="
              text-xl font-semibold mb-2
              text-slate-900
              transition-colors
              group-hover:text-blue-600
            ">
              🔗 Dán link sản phẩm
            </h3>

            <p className="text-slate-600">
              Đã có link từ website Pháp? Dán link để nhận báo giá nhanh.
            </p>

            <span className="
              inline-block mt-4 text-sm font-medium text-blue-600
              opacity-0 translate-y-1
              group-hover:opacity-100 group-hover:translate-y-0
              transition
            ">
              Dán link →
            </span>
          </Link>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-16 px-8 rounded-2xl border text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-900">
          Cách PhapShopping hoạt động
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="
                bg-slate-50 p-6 rounded-xl
                border border-slate-200
                transition-all duration-200
                hover:shadow-lg hover:-translate-y-1
                text-left
              "
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/link"
          className="
            inline-block
            bg-primary text-primary-foreground
            px-8 py-3 rounded-lg
            font-semibold
            transition-all
            hover:bg-blue-700 hover:-translate-y-0.5
            shadow-sm hover:shadow-md
          "
        >
          Bắt đầu mua ngay
        </Link>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="bg-slate-50 p-8 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-slate-900">
          Gợi ý sản phẩm theo chủ đề
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.link}
                className="
                  group flex flex-col items-center
                  p-6 bg-white rounded-xl
                  border border-slate-200
                  transition-all duration-200
                  hover:border-blue-500 hover:shadow-lg hover:-translate-y-1
                  text-center
                "
              >
                <Icon
                  className="
                    w-10 h-10 text-blue-600
                    transition-transform duration-200
                    group-hover:scale-110
                  "
                />
                <span className="
                  mt-4 font-medium text-sm md:text-base
                  transition-colors
                  group-hover:text-blue-600
                ">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
