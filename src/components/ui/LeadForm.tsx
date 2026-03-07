"use client";

import { useState, FormEvent } from "react";
import { basePath } from "@/lib/env";
import { createTrackFunction } from "@/hooks/useTracking";

type FormStatus = "idle" | "sending" | "success" | "error";

interface LeadFormProps {
  className?: string;
  buttonText?: string;
  buttonClassName?: string;
  inputClassName?: string;
  formName?: string;
  formId?: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function LeadForm({
  className = "flex flex-col gap-4",
  buttonText = "ENVIAR",
  buttonClassName = "self-center bg-brand-accent text-white font-body font-bold text-base px-16 py-2.5 hover:opacity-90 transition-opacity cursor-pointer",
  inputClassName = "w-full border border-black px-5 py-3 font-body text-base text-black placeholder:text-black/50 bg-transparent outline-none focus:ring-2 focus:ring-brand-highlight",
  formName = "lead_form",
  formId = "lead-form",
}: LeadFormProps) {
  const track = createTrackFunction();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      form_name: formName,
      form_id: formId,
    };

    try {
      const res = await fetch(`${basePath}/send-form.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Erro ao enviar formulario");
      }

      setStatus("success");
      form.reset();
      setPhone("");

      // GTM dataLayer push
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "form_submission",
          form_name: formName,
          form_id: formId,
        });
      }

      // Meta CAPI + Pixel tracking
      track("Lead", {
        email: payload.email,
        phone: payload.phone,
        name: payload.name,
        form_name: formName,
        form_id: formId,
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Erro inesperado. Tente novamente."
      );
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="font-body text-lg font-bold text-black">
            Dados enviados com sucesso!
          </p>
          <p className="font-body text-sm text-black/70">
            Em breve entraremos em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input
        type="text"
        name="name"
        placeholder="Seu nome completo"
        required
        className={inputClassName}
      />
      <input
        type="email"
        name="email"
        placeholder="Seu melhor e-mail"
        required
        className={inputClassName}
      />
      <input
        type="tel"
        name="phone"
        placeholder="DDD (19) 99999-9999"
        required
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
        className={inputClassName}
      />

      {status === "error" && errorMessage && (
        <p className="font-body text-sm text-red-600">{errorMessage}</p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClassName}>
        {status === "sending" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}
