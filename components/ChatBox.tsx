"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  text: string;
  from: "user" | "bot";
};

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [suggested, setSuggested] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggested]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setMessages(prev => [...prev, { text, from: "user" }]);
    setInput("");
    setSuggested([]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: {} }),
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { text: data.reply || "Xin lỗi, mình chưa hiểu câu hỏi.", from: "bot" },
      ]);

      if (data.suggestedQuestions) {
        setSuggested(data.suggestedQuestions);
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { text: "Đã có lỗi xảy ra, vui lòng thử lại.", from: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderText = (text: string) => {
    return text.split("/search").map((part, idx, arr) => (
      <span key={idx}>
        {part}
        {idx < arr.length - 1 && (
          <a href="/search" className="text-blue-600 underline ml-1">
            /search
          </a>
        )}
      </span>
    ));
  };

  return (
    <div className="w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border">
      {/* Header */}
      <div className="h-12 bg-blue-600 text-white flex items-center px-4 text-sm font-medium">
        PhapShopping
        <span className="ml-2 text-xs text-blue-100">● Đang hỗ trợ</span>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 py-2 space-y-3 overflow-y-auto bg-gray-50">
        {messages.map((m, i) =>
          m.from === "user" ? (
            /* USER */
            <div key={i} className="flex justify-end">
              <div className="max-w-[75%]">
                <div className="text-xs text-right text-gray-400 mb-1">
                  Bạn
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-sm text-sm">
                  {m.text}
                </div>
              </div>
            </div>
          ) : (
            /* BOT */
            <div key={i} className="flex gap-2 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                PS
              </div>
              <div className="max-w-[75%]">
                <div className="text-xs text-gray-500 mb-1">
                  PhapShopping
                </div>
                <div className="bg-white border px-4 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-800">
                  {renderText(m.text)}
                </div>
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex gap-2 items-center text-xs text-gray-400">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              PS
            </div>
            PhapShopping đang trả lời…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {suggested.length > 0 && (
        <div className="px-3 py-2 flex flex-wrap gap-2 bg-white border-t">
          {suggested.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200 hover:bg-blue-100 transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 border-t px-3 py-2 bg-white">
        <input
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Nhập câu hỏi…"
          value={input}
          disabled={loading}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") sendMessage(input);
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
