import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import CookieConsent from "@/components/ui/CookieConsent";
import "./globals.css";

// Placeholder fonts — replace per project
const headingFont = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nome do Projeto",
  description: "Descrição da landing page do projeto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
