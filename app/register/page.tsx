"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    setMessage(data.error || data.message);
  }

  return (
    <form className="max-w-sm mx-auto mt-20 space-y-4" onSubmit={handleSubmit}>
      <input className="border p-2 w-full" placeholder="Nom" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />

      <button className="w-full bg-green-600 text-white p-2">S'inscrire</button>

      {message && <p className="text-center mt-4 text-blue-600">{message}</p>}
    </form>
  );
}
