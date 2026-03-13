import OptimizedImage from "@/components/ui/OptimizedImage";
import { basePath } from "@/lib/env";

export default function Seguranca() {
  return (
    <section className="relative w-full">
      {/* Background image */}
      <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        <OptimizedImage
          src={`${basePath}/images/seguranca-bg.png`}
          alt="Vista aérea do loteamento Quinta dos Bons Ventos"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Card overlay */}
        <div className="absolute bottom-0 left-0 right-0 md:bottom-10 md:left-8 md:right-auto lg:bottom-14 lg:left-12">
          <div className="bg-[rgba(217,217,217,0.85)] px-5 py-6 md:px-10 md:py-10 w-full md:w-auto md:max-w-[466px] rounded-none md:rounded-tr-[140px]">
            <p className="font-body font-medium text-base md:text-2xl lg:text-[32px] lg:leading-tight text-black">
              <span className="font-bold uppercase">
                Mais segurança
                <br />
                e tranquilidade
              </span>
            </p>

            <p className="font-body font-medium text-sm md:text-2xl lg:text-[28px] lg:leading-tight text-black mt-3 md:mt-6">
              Videomonitoramento e Vigilância no Residencial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
