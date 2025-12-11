"use client";

import { useState, useEffect } from "react";

interface Product {
  name: string;
  description?: string;
  estimatedPrice?: number;
  websites?: { name: string; url: string }[];
}

interface ChatBoxProps {
  initialMessage?: string;
}

export default function ChatBox({ initialMessage = "" }: ChatBoxProps) {
  const [message, setMessage] = useState(initialMessage);
  const [products, setProducts] = useState<Product[]>([]);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialMessage) handleSend(initialMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  const handleSend = async (msg?: string) => {
    const text = msg ?? message;
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setInfo("");
    setProducts([]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      if (data.reply?.suggestedProducts) setProducts(data.reply.suggestedProducts);
      setInfo(`AI đã gợi ý ${data.reply?.suggestedProducts?.length || 0} sản phẩm`);
    } catch (err: any) {
      console.error(err);
      setError("Có lỗi khi gọi AI");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-4">
      <input
        className="border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Nhập mô tả sản phẩm..."
        disabled={loading}
      />
      <button
        onClick={() => handleSend()}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Đang gửi..." : "Gửi"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {info && <p className="text-gray-700">{info}</p>}

      {products.length > 0 && (
        <div className="mt-2 flex flex-col gap-3">
          {products.map((p, i) => (
            <div key={i} className="border p-3 rounded shadow-sm bg-white">
              <p className="font-semibold text-lg">{p.name}</p>
              {p.description && <p className="text-sm text-gray-700 mt-1">{p.description}</p>}
              {p.estimatedPrice && (
                <p className="text-sm text-green-600">Giá ước tính: {p.estimatedPrice}€</p>
              )}
              {p.websites && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.websites.map((w, idx) => (
                    <a
                      key={idx}
                      href={w.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-sm"
                    >
                      {w.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
