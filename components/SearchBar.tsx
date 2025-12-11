"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex w-[680px] border rounded overflow-hidden">
      <input
        type="text"
        placeholder="Nhập mô tả sản phẩm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="flex-1 px-4 py-2 outline-none"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4">
        🔍
      </button>
    </div>
  );
}
