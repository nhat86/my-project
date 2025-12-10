import ProductGrid from "@/components/products/ProductGrid";
import ChatBox from "@/components/ChatBox";
export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sản phẩm mới</h1>
      <ProductGrid />
       <h2 className="text-2xl font-semibold mt-10 mb-4">Chat với AI</h2>
      <ChatBox />
    </div>
  );
}
