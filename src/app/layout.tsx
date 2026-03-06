import type { Metadata } from "next";
import { Montserrat, Sora } from "next/font/google";
import CookieConsent from "@/components/ui/CookieConsent";
import GoogleTagManager from "@/components/ui/GoogleTagManager";
import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quinta dos Bons Ventos - Lotes em Itatiba",
  description: "Lotes residenciais e comerciais em Itatiba. Loteamento aberto a partir de 250m², pronto para construir.",
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
        <GoogleTagManager />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
