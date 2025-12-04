"use client";
import Link from "next/link";
import { useState } from "react";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Users", path: "/dashboard/users" },
  { name: "Posts", path: "/dashboard/posts" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);
  return (
    <aside className="w-60 bg-white h-screen shadow p-4">
      <h2 className="font-bold text-xl mb-4">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {menu.map((m) => (
          <Link key={m.path} href={m.path}>
            {m.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
