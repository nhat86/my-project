"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser } from "../../app/context/UserContext";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();

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
        <div className="hidden md:flex gap-6 text-lg items-center">
          <Link href="/products">Sản phẩm</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/cart">Giỏ hàng</Link>

          {/* Nếu user login, show icon */}
          {user && (
            <Link href="/">
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}&background=random`}
                alt="User Icon"
                className="w-8 h-8 rounded-full ml-4"
              />
            </Link>
          )}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 ml-4"
        >
          {isDark ? "Light" : "Dark"}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden ml-2"
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

          {/* User icon mobile */}
          {user && (
            <Link href="/" className="mt-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user.email}&background=random`}
                alt="User Icon"
                className="w-8 h-8 rounded-full"
              />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
