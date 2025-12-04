"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
   const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);


  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          VietShop
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link href="/products">Sản phẩm</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/cart">Giỏ hàng</Link>
        </div>
        {/* Nút toggle tích hợp trong Navbar */}
        <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
        >
            {isDark ? "Light" : "Dark"}
        </button>
        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-gray-100 p-4 flex flex-col gap-4">
          <Link href="/products">Sản phẩm</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/cart">Giỏ hàng</Link>
        </div>
      )}
    </nav>
  );
}
