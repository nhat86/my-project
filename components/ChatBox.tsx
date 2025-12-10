"use client";
import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();

      if (data.reply?.error) {
        setError(data.reply.error);
      } else {
        setProducts(data.reply.suggestedProducts || []);
      }
    } catch (err: any) {
      console.error(err);
      setError("Có lỗi xảy ra khi gọi AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto mt-4">
      <input
        className="border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập câu hỏi về sản phẩm..."
        disabled={loading}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Đang gửi..." : "Gửi"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 && (
        <div className="mt-2 flex flex-col gap-3">
          {products.map((p: any, i: number) => (
            <div key={i} className="border p-3 rounded shadow-sm bg-white">
              <p className="font-semibold text-lg">{p.name}</p>

              {p.volume && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Dung tích:</span> {p.volume}
                </p>
              )}

              {p.estimatedPrice && (
                <p className="text-sm text-green-600">
                  <span className="font-medium">Giá ước tính:</span> {p.estimatedPrice}
                </p>
              )}

              {p.description && (
                <p className="text-sm text-gray-700 mt-1">{p.description}</p>
              )}

              {p.websites && p.websites.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.websites.map((w: any, idx: number) => (
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
