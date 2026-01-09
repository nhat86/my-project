// components/ContactBar.tsx
"use client";
import { useState, useEffect } from "react";

export default function ContactBar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra thiết bị mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // <768px coi là mobile
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50"
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      {/* Icon liên hệ chung */}
      <div className="flex flex-col items-center animate-bounce hover:animate-none">
        <button
          onClick={() => isMobile && setOpen(!open)}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 transition transform hover:scale-110 text-2xl"
        >
          📞
        </button>
        <span className="mt-1 text-sm text-green-600 font-medium text-center">
          Liên hệ chúng tôi
        </span>
      </div>

      {/* Email & Messenger */}
      {open && (
        <>
          {/* Email mở Gmail web */}
          <div className="flex flex-col items-center">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vtmnhat@gmail.com&su=Liên%20hệ&body="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-full shadow-xl hover:bg-red-600 transition transform hover:scale-110 text-2xl"
            >
              ✉️
            </a>
            <span className="mt-1 text-sm text-red-600 font-medium">
              Gửi Email
            </span>
          </div>

          {/* Messenger */}
          <div className="flex flex-col items-center mt-2">
            <a
              href="https://www.facebook.com/shopping4u.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition transform hover:scale-110 text-2xl"
            >
              🟦
            </a>
            <span className="mt-1 text-sm text-blue-600 font-medium">
              Chat Messenger
            </span>
          </div>
        </>
      )}
    </div>
  );
}
