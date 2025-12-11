import SearchBar from "@/components/SearchBar";
import FeatureCard from "@/components/FeatureCard";
import ProductGrid from "@/components/products/ProductGrid";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <>
      

      <main className="w-full flex flex-col items-center">

        {/* HERO */}
        <section className="w-full max-w-6xl text-center py-20 px-4">
          <h1 className="text-4xl font-bold mb-4">
            Mua hộ hàng Pháp — nhanh & minh bạch
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Tìm sản phẩm bằng mô tả tiếng Việt. AI hỗ trợ gợi ý và báo giá nhanh.
          </p>

          <div className="flex justify-center">
            <SearchBar />
          </div>
        </section>

        {/* FEATURES */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-20">
          <FeatureCard
            title="Tìm kiếm bằng AI"
            desc="Nhập mô tả tiếng Việt — hệ thống tìm đúng sản phẩm bạn muốn."
          />
          <FeatureCard
            title="Báo giá minh bạch"
            desc="Giá gốc, phí dịch vụ, vận chuyển — rõ ràng từng bước."
          />
          <FeatureCard
            title="Mua hộ từ Pháp"
            desc="Chúng tôi mua trực tiếp từ cửa hàng uy tín tại Pháp."
          />
        </section>
      </main>

   
    </>
  );
}
