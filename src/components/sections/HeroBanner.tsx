import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-white">
      {/* Logo em barra branca — apenas mobile */}
      <div className="flex justify-center py-3 md:hidden">
        <Image
          src="/images/logo-quinta-dos-bons-ventos.png"
          alt="Quinta dos Bons Ventos - Itatiba"
          width={530}
          height={234}
          priority={true}
          className="w-[210px] h-auto"
        />
      </div>

      {/* Logo centralizada sobre a imagem — tablet/desktop */}
      <div className="hidden md:block absolute top-4 lg:top-5 left-1/2 -translate-x-1/2 z-10">
        <Image
          src="/images/logo-quinta-dos-bons-ventos.png"
          alt="Quinta dos Bons Ventos - Itatiba"
          width={530}
          height={234}
          priority={true}
          className="w-[300px] lg:w-[450px] h-auto"
        />
      </div>

      {/* Imagem aérea — full img sem corte */}
      <Image
        src="/images/hero-banner.png"
        alt="Vista aérea do loteamento Quinta dos Bons Ventos em Itatiba"
        width={4000}
        height={2250}
        priority={true}
        className="w-full h-auto"
      />
    </section>
  );
}
