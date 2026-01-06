"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { setUser } = useUser(); // hàm setUser từ context
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); // reset thông báo

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // Lưu user vào context
        setUser(data.user);
        router.push("/"); // quay về trang chủ
      } else {
        setMsg(data.error || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      setMsg("Lỗi server, vui lòng thử lại");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-xs mx-auto mt-10 p-6 border rounded shadow"
    >
      <h1 className="text-xl font-bold text-center mb-4">Đăng nhập</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="p-2 border rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
        className="p-2 border rounded"
      />

      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Đăng nhập
      </button>

      {msg && <p className="text-red-500 text-sm mt-2">{msg}</p>}

      <p className="text-sm mt-4 text-center">
        Chưa có tài khoản?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline"
        >
          Đăng ký
        </a>
      </p>
    </form>
  );
}
