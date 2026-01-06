import { SOURCES, type CategorySources } from "../../../lib/sources";
import { notFound } from "next/navigation";
import SiteGrid from "@/components/SiteGrid";

type CategoryPageProps = {
  params: Promise<{ slug?: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  if (!slug) return notFound();

  const normalizedSlug = slug.toLowerCase();

  const category: CategorySources | undefined = SOURCES.find((cat) => {
    if (!cat?.name) return false;
    if (cat.name.toLowerCase() === normalizedSlug) return true;
    if (!Array.isArray(cat.keywords)) return false;
    return cat.keywords.some(
      (k) => typeof k === "string" && k.toLowerCase() === normalizedSlug
    );
  });

  if (!category) return notFound();

  return (
    <main className="px-4 py-12 space-y-20 max-w-7xl mx-auto">

      {/* HERO / ABOVE THE FOLD */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          {category.name_vi} 🇫🇷  
          <br className="hidden md:block" />
          Trang web mua sắm uy tín tại Pháp
        </h1>

        <p className="text-base md:text-lg text-slate-600">
          Tổng hợp các website chính hãng trong lĩnh vực{" "}
          <span className="font-medium text-slate-800">
            {category.name_vi.toLowerCase()}
          </span>
          .  
          <br className="hidden md:block" />
          👉 Chọn link – gửi PhapShopping – nhận hàng tại Việt Nam.
        </p>

        <p className="text-sm text-slate-500">
          ✔️ Chính hãng · ✔️ Giá gốc Pháp · ✔️ Giao tận tay
        </p>
      </section>

      {/* CONTENT */}
      <section className="bg-slate-50 p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {category.name_vi} - Các website nổi bật
          </h2>

          <span className="text-sm text-slate-500">
            💡 Click vào website → copy link → gửi cho chúng tôi
          </span>
        </div>

        {/* SITE GRID */}
        <div className="group">
          <SiteGrid
            sites={category.sites.map((site) => ({
              ...site,
              className:
                "bg-white rounded-xl border transition-all duration-300 " +
                "hover:-translate-y-1 hover:shadow-xl hover:border-blue-300",
              imageClassName:
                "transition-transform duration-300 group-hover:scale-105",
            }))}
            />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <a
          href="/link"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold 
          hover:bg-blue-700 transition shadow-md hover:shadow-xl"
        >
          🚀 Dán link & nhận báo giá ngay
        </a>
      </section>
    </main>
  );
}
