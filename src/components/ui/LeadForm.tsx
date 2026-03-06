"use client";

import { useState } from "react";
import { basePath } from "@/lib/env";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function LeadForm() {
  const [phone, setPhone] = useState("");

  return (
    <form action={`${basePath}/send-form.php`} method="POST" className="flex flex-col gap-4">
      <input
        type="text"
        name="nome"
        placeholder="Seu nome completo"
        required
        className="w-full border border-black px-5 py-3 font-body text-base text-black placeholder:text-black/50 bg-transparent outline-none focus:ring-2 focus:ring-brand-highlight"
      />
      <input
        type="email"
        name="email"
        placeholder="Seu melhor e-mail"
        required
        className="w-full border border-black px-5 py-3 font-body text-base text-black placeholder:text-black/50 bg-transparent outline-none focus:ring-2 focus:ring-brand-highlight"
      />
      <input
        type="tel"
        name="telefone"
        placeholder="DDD (19) 99999-9999"
        required
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        className="w-full border border-black px-5 py-3 font-body text-base text-black placeholder:text-black/50 bg-transparent outline-none focus:ring-2 focus:ring-brand-highlight"
      />
      <button
        type="submit"
        className="self-center bg-brand-accent text-white font-body font-bold text-base px-16 py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
      >
        ENVIAR
      </button>
    </form>
  );
}
