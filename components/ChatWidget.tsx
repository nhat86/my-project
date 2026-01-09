"use client";

import { useState } from "react";
import Chatbox from "./ChatBox";
import TranslateBox from "./TranslateBox";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "translate">("chat");

  return (
    <>
      {/* Chat Icon */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center">
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center transition transform hover:scale-110"
          aria-label="Chat hỗ trợ"
          title="Hỗ trợ mua sắm & dịch thuật Pháp-Việt"
        >
          💬
        </button>
        <span className="mt-1 text-xs text-center text-blue-600 font-medium">
          Hỗ trợ mua sắm & dịch thuật
        </span>
      </div>

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[320px] h-[500px] shadow-2xl bg-white rounded-2xl flex flex-col">
          {/* Tab chọn */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 text-sm ${tab === "chat" ? "border-b-2 border-blue-600 font-semibold" : ""}`}
              onClick={() => setTab("chat")}
            >
              Mua sắm
            </button>
            <button
              className={`flex-1 py-2 text-sm ${tab === "translate" ? "border-b-2 border-green-600 font-semibold" : ""}`}
              onClick={() => setTab("translate")}
            >
              Dịch thuật
            </button>
          </div>

          {/* Nội dung tab */}
          <div className="flex-1 overflow-hidden">
            {tab === "chat" ? <Chatbox /> : <TranslateBox />}
          </div>
        </div>
      )}
    </>
  );
}
