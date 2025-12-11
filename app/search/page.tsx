"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { detectCategory } from "@/lib/detectCategory";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [message, setMessage] = useState(query);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchAI = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setProducts([]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setProducts(data.reply?.suggestedProducts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) fetchAI();
  }, [query]);

  // Lấy danh sách category gợi ý
  const categories = detectCategory(query) || [];

  return (
    <div className="w-full flex flex-col items-center py-14 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Kết quả tìm kiếm cho: "{query}"
      </h1>

      {/* Search bar */}
      <div className="flex w-full max-w-2xl mb-8 gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchAI();
          }}
          className="flex-1 border p-3 rounded-lg"
          placeholder="Nhập mô tả sản phẩm…"
        />
        <button
          onClick={fetchAI}
          className="px-6 bg-blue-600 text-white rounded-lg"
        >
          Gửi
        </button>
      </div>

      {/* NÚT CHUYỂN GRID / LIST */}
      <div className="w-full max-w-6xl flex justify-end mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg border ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            Danh sách
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg border ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            Lưới 3 cột
          </button>
        </div>
      </div>

      {/* LIST / GRID OUTPUT */}
      {loading && <p className="text-gray-500 mt-4">Đang tìm kiếm…</p>}

      {!loading && (
        <>
          {products.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
                  : "flex flex-col gap-4 w-full max-w-3xl"
              }
            >
              {products.map((p, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg">{p.name}</h3>

                  {p.description && (
                    <p className="text-gray-600 text-sm mt-1">{p.description}</p>
                  )}

                  {p.technical && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Thông số:</span> {p.technical}
                    </p>
                  )}

                  <p className="text-green-600 font-medium mt-2">
                    Giá ước tính: {p.estimatedPrice}€
                  </p>

                  {p.websites?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {p.websites.map((w: any, i: number) => (
                        <a
                          key={i}
                          href={w.url}
                          target="_blank"
                          className="text-blue-600 underline text-sm"
                        >
                          {w.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-700 mt-4">
              <p>Chúng tôi không tìm thấy sản phẩm với "{query}".</p>
              {categories.length > 0 && (
                <>
                  <p>Thử tìm với các category liên quan:</p>
                  <ul className="mt-2 space-y-1">
                    {categories.map((cat, i) => (
                      <li key={i}>• {cat}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
