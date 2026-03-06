import HeroBanner from "@/components/sections/HeroBanner";
import Destaques from "@/components/sections/Destaques";
import ProntoConstruir from "@/components/sections/ProntoConstruir";
import CondicoesPagamento from "@/components/sections/CondicoesPagamento";
import Seguranca from "@/components/sections/Seguranca";
import Natureza from "@/components/sections/Natureza";
import Localizacao from "@/components/sections/Localizacao";
import FooterFormulario from "@/components/sections/FooterFormulario";

export default function LandingPageContent() {
  return (
    <main className="min-h-screen bg-white">
      <HeroBanner />
      <Destaques />
      <ProntoConstruir />
      <CondicoesPagamento />
      <Seguranca />
      <Natureza />
      <Localizacao />
      <FooterFormulario />
    </main>
  );
}
