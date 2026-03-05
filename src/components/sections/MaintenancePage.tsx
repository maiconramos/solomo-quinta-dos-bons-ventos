import Link from "next/link";

export default function MaintenancePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      {/* Construction sign illustration */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
        aria-hidden="true"
      >
        {/* Warning triangle */}
        <path
          d="M80 20L145 130H15L80 20Z"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="3"
        />
        {/* Exclamation mark */}
        <rect x="75" y="55" width="10" height="40" rx="3" fill="white" />
        <circle cx="80" cy="108" r="6" fill="white" />
        {/* Wrench (left) */}
        <path
          d="M30 135C30 135 45 120 50 115C55 110 50 105 45 110L30 125C25 130 30 135 30 135Z"
          fill="#6B7280"
          stroke="#4B5563"
          strokeWidth="1.5"
        />
        <circle cx="28" cy="137" r="5" fill="#6B7280" stroke="#4B5563" strokeWidth="1.5" />
        {/* Wrench (right) */}
        <path
          d="M130 135C130 135 115 120 110 115C105 110 110 105 115 110L130 125C135 130 130 135 130 135Z"
          fill="#6B7280"
          stroke="#4B5563"
          strokeWidth="1.5"
        />
        <circle cx="132" cy="137" r="5" fill="#6B7280" stroke="#4B5563" strokeWidth="1.5" />
      </svg>

      <h1 className="mb-4 text-3xl font-bold text-brand-primary font-heading md:text-4xl">
        Site em Manutenção
      </h1>

      <p className="mb-6 max-w-md text-lg text-gray-600">
        Desculpe o transtorno, estamos trabalhando para melhor atendê-los.
      </p>

      <p className="mb-10 text-lg font-bold uppercase text-brand-primary">
        AGUARDE!!! EM BREVE TEREMOS NOVIDADES
      </p>

      <footer className="absolute bottom-6 text-sm text-gray-400">
        <Link
          href="/politica-de-privacidade"
          className="underline hover:text-gray-600 transition-colors"
        >
          Política de Privacidade
        </Link>
      </footer>
    </section>
  );
}
