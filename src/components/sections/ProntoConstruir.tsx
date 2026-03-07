import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { basePath } from "@/lib/env";

export default function ProntoConstruir() {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row">
        {/* Coluna esquerda — fundo marrom com texto */}
        <div className="flex items-center justify-center bg-brand-secondary px-8 py-12 md:w-[40%] md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="flex flex-col gap-6 max-w-[445px]">
            <Image
              src={`${basePath}/images/icon-safety.svg`}
              alt="Ícone de capacete de segurança"
              width={71}
              height={71}
              unoptimized
            />

            <p className="font-body text-xl font-medium leading-snug text-white md:text-2xl lg:text-[32px] lg:leading-snug">
              Pronto para construir
            </p>

            <p className="font-body text-xl font-medium leading-snug text-white md:text-2xl lg:text-[32px] lg:leading-snug">
              Excelente localização com alto potencial de valorização.
            </p>

            <p className="font-body text-xl font-medium leading-snug text-white md:text-2xl lg:text-[32px] lg:leading-snug">
              Perfeito para instalar seu negócio ou construir a casa dos seus
              sonhos.
            </p>
          </div>
        </div>

        {/* Coluna direita — foto aérea */}
        <div className="relative min-h-[300px] md:w-[60%] md:min-h-[500px]">
          <OptimizedImage
            src={`${basePath}/images/pronto-para-construir.png`}
            alt="Vista aérea do loteamento Quinta dos Bons Ventos"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
