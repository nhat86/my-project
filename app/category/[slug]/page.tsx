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
    <main className="px-4 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900 capitalize">
        {category.name} – Trang Web Nổi Tiếng Của Pháp
      </h1>
      <p className="text-gray-600 mb-10 text-lg">
        Khám phá các trang web uy tín tại Pháp trong lĩnh vực{" "}
        {category.name.toLowerCase()}. Bạn có thể truy cập trực tiếp các
        thương hiệu nổi tiếng sau đây.
      </p>

      {/* Grid site cards */}
       <h1 className="text-2xl font-bold mb-6">{category.title}</h1>

      <SiteGrid sites={category.sites} />

    </main>
  );
}
