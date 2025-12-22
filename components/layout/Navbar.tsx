"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../app/context/UserContext";
import { categories } from "../../app/data/categories";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [catOpenDesktop, setCatOpenDesktop] = useState(false);
  const [catOpenMobile, setCatOpenMobile] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // const { user, setUser } = useUser(); // tạm thời comment user context

  // const handleLogout = () => setUser(null); // tạm thời comment logout

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

<Link href="/" className="flex flex-col items-center leading-tight">
<img src="/logo.png" alt="Logo" className="h-16 md:h-24 w-auto" />
  {/* Logo text */}
  <span className="text-1xl md:text-2xl font-bold text-blue-800 tracking-wide font-[Poppins]">
    PhapShopping
  </span>

  {/* Tagline */}
  <span className="text-sm md:text-base text-red-600 mt-1 font-[Dancing_Script] text-center">
    Mua hộ đồ Pháp cho người Việt
  </span>
</Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center relative text-lg">
          <Link href="/">Trang chủ</Link>
          <Link href="/search">Tìm kiếm AI</Link>
          <Link href="/link">Nhập link sản phẩm</Link>

          {/* Dropdown danh mục */}
          <div className="relative">
            <button onClick={() => setCatOpenDesktop(!catOpenDesktop)} className="flex items-center gap-1">
              Danh mục sản phẩm ▼
            </button>
            {catOpenDesktop && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 w-56 z-50">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <Link key={idx} href={cat.link} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <Icon className="w-5 h-5" /> <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* User / Hồ sơ */}
          {/*
          {user ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <img
                  src={`https://ui-avatars.com/api/?name=${user.email}&background=random`}
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow p-4 rounded">
                  <p className="font-semibold">{user.email}</p>
                  <Link href="/profile" className="block mt-2 px-3 py-1 text-blue-600 hover:underline">
                    Xem thông tin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="mt-2 w-full px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="px-2 py-1 border rounded text-sm">Đăng nhập</Link>
              <Link href="/register" className="px-2 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700">
                Đăng ký
              </Link>
            </div>
          )}
          */}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden ml-2" onClick={() => { setOpenMobile(!openMobile); setCatOpenMobile(false); }}>
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {openMobile && (
        <div className="md:hidden bg-gray-100 p-4 flex flex-col gap-4">
          <Link href="/">Trang chủ</Link>
          <Link href="/search">Tìm kiếm AI</Link>
          <Link href="/link">Nhập link sản phẩm</Link>

          {/* Accordion danh mục mobile */}
          <div className="flex flex-col">
            <button className="text-left font-medium" onClick={() => setCatOpenMobile(!catOpenMobile)}>
              Danh mục sản phẩm {catOpenMobile ? "▲" : "▼"}
            </button>
            {catOpenMobile && (
              <div className="flex flex-col pl-4 mt-2 gap-2">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <Link key={idx} href={cat.link} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded">
                      <Icon className="w-5 h-5" /> <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/*
          {user ? (
            <>
              <img src={`https://ui-avatars.com/api/?name=${user.email}&background=random`} className="w-8 h-8 rounded-full" />
              <button onClick={handleLogout} className="mt-2 px-2 py-1 border rounded text-sm">Đăng xuất</button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" className="px-2 py-1 border rounded text-sm">Đăng nhập</Link>
              <Link href="/register" className="px-2 py-1 border rounded text-sm bg-blue-600 text-white hover:bg-blue-700">
                Đăng ký
              </Link>
            </div>
          )}
          */}
        </div>
      )}
    </nav>
  );
}
