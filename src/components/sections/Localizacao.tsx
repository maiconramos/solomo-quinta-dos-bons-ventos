import Image from "next/image";
import { basePath } from "@/lib/env";

const distancias = [
  { tempo: "3 min", local: "da USF" },
  { tempo: "3 min", local: "da Rod. das Estâncias" },
  { tempo: "5 min", local: "do Itatiba Mall" },
];

export default function Localizacao() {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Coluna esquerda - Texto */}
        <div className="w-full lg:w-[36%] bg-brand-secondary px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 flex items-center justify-center">
          <div className="max-w-[500px]">
            <h2 className="font-body font-bold text-[28px] md:text-[34px] lg:text-[40px] leading-tight text-white mb-2">
              LOCALIZAÇÃO
              <br />
              PRIVILEGIADA
            </h2>

            <p className="font-heading font-normal text-base md:text-xl lg:text-[24px] text-white mt-2 mb-6 lg:mb-8">
              Ao lado do <strong>Parque Ferraz Costa</strong>
            </p>

            <ul className="flex flex-col gap-3 lg:gap-4">
              {distancias.map((item) => (
                <li key={item.local} className="flex items-center gap-3">
                  <Image
                    src={`${basePath}/images/icon-clock.svg`}
                    alt="Relógio"
                    width={30}
                    height={29}
                    className="shrink-0"
                  />
                  <span className="font-body font-normal text-lg md:text-xl lg:text-[25px] text-white">
                    <strong>{item.tempo}</strong> {item.local}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna direita - Foto */}
        <div className="w-full lg:w-[64%] relative min-h-[250px] md:min-h-[350px] lg:min-h-[500px]">
          <Image
            src={`${basePath}/images/localizacao-foto.png`}
            alt="Vista aérea do empreendimento Quinta dos Bons Ventos em Itatiba"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 64vw"
          />
        </div>
      </div>
    </section>
  );
}
