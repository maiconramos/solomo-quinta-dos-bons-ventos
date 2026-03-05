"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function getServerSnapshot() {
  return true; // hide on server to avoid hydration mismatch
}

export default function CookieConsent() {
  const accepted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-brand-primary">
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-6 px-4 py-3">
        <p className="text-white text-sm">
          Atualizamos a{" "}
          <Link
            href="/politica-de-privacidade"
            className="underline font-bold hover:opacity-80"
          >
            Política de Privacidade
          </Link>{" "}
          do site. Ao continuar navegando, entendemos que você está ciente e de
          acordo.
        </p>
        <button
          onClick={handleAccept}
          className="bg-brand-highlight text-white font-bold text-sm uppercase tracking-wider px-5 py-2 rounded-full hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          Eu aceito
        </button>
      </div>
    </div>
  );
}
