import OptimizedImage from "@/components/ui/OptimizedImage";
import { basePath } from "@/lib/env";

export default function Natureza() {
  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-20 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row md:items-center">
        {/* Ilustracao folhas — vem da borda esquerda da tela, ~45% da largura */}
        <div className="w-[70%] md:w-[45%] shrink-0 -ml-2 md:-ml-8 lg:-ml-12 mt-6 md:mt-0">
          <OptimizedImage
            src={`${basePath}/images/natureza-folhas.png`}
            alt="Ilustração de galho com folhas verdes"
            width={800}
            height={450}
            className="w-full h-auto"
            sizes="(max-width: 768px) 70vw, 45vw"
          />
        </div>

        {/* Texto */}
        <div className="flex-1 flex flex-col items-start gap-4 md:gap-6 px-6 md:px-8 lg:px-12">
          {/* Titulo com fundo verde */}
          <div className="bg-brand-primary px-4 py-2.5 md:px-6 md:py-3.5">
            <h2 className="font-heading font-bold text-lg md:text-2xl lg:text-[32px] lg:leading-tight text-white uppercase">
              Viva em sintonia com a natureza
            </h2>
          </div>

          {/* Subtitulo */}
          <p className="font-heading font-normal text-lg md:text-2xl lg:text-[32px] lg:leading-snug text-black max-w-[700px]">
            Projeto paisagístico com uma área verde de 74.000m² com mais de
            4.500 árvores.
          </p>
        </div>
      </div>
    </section>
  );
}
