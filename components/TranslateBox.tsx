"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  input: string;
  output: string;
  direction: "vi2fr" | "fr2vi";
};

export default function TranslateBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<"vi2fr" | "fr2vi">("fr2vi");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const translate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          context: { translation: direction },
        }),
      });

      const data = await res.json();
      const reply = data.reply || "Không thể dịch nội dung.";

      setMessages((prev) => [
        ...prev,
        { input, output: reply, direction },
      ]);

      setInput("");
    } catch {
      setMessages((prev) => [
        ...prev,
        { input, output: "Có lỗi khi dịch, thử lại nhé.", direction },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <div className="w-full flex flex-col border rounded-xl p-3 bg-white">
      {/* Chọn hướng dịch */}
      <div className="mb-2 flex gap-2 text-sm">
        <button
          onClick={() => setDirection("fr2vi")}
          className={`px-3 py-1 rounded-full border ${
            direction === "fr2vi"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🇫🇷 → 🇻🇳
        </button>
        <button
          onClick={() => setDirection("vi2fr")}
          className={`px-3 py-1 rounded-full border ${
            direction === "vi2fr"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          🇻🇳 → 🇫🇷
        </button>
        {/* Nút xóa lịch sử */}
        {messages.length > 0 && (
          <button
            onClick={clearHistory}
            className="ml-auto px-3 py-1 rounded-full border bg-red-600 text-white hover:bg-red-700 text-sm"
          >
            Xóa lịch sử
          </button>
        )}
      </div>

      {/* Input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && translate()}
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none mb-2"
        placeholder="Nhập từ/cụm từ cần dịch…"
        disabled={loading}
      />

      {/* Lịch sử dịch */}
      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto p-2 border rounded-lg bg-gray-50 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="text-gray-700">
              <strong>{msg.direction === "fr2vi" ? "🇫🇷" : "🇻🇳"}:</strong> {msg.input}
            </div>
            <div className="text-blue-700 whitespace-pre-line">
              <strong>{msg.direction === "fr2vi" ? "🇻🇳" : "🇫🇷"}:</strong> {msg.output}
            </div>
          </div>
        ))}
        {loading && <div>Đang dịch...</div>}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
