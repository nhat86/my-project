"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; // từ shadcn
import { Button } from "@/components/ui/button";

export default function UserRegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", form);
    // TODO: call API
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-center">Register</h2>

      <div>
        <label className="block mb-1">Name</label>
        <Input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <Input name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
