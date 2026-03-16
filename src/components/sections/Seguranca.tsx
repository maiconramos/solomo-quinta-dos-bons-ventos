import OptimizedImage from "@/components/ui/OptimizedImage";
import { basePath } from "@/lib/env";

export default function Seguranca() {
  return (
    <section className="flex flex-col md:relative w-full">
      {/* Background image container */}
      <div className="relative w-full h-[250px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
        <OptimizedImage
          src={`${basePath}/images/seguranca-bg.png`}
          alt="Vista aérea do loteamento Quinta dos Bons Ventos"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Card container */}
      <div className="relative md:absolute md:bottom-10 md:left-8 md:right-auto lg:bottom-14 lg:left-12 w-full md:w-auto">
        <div className="bg-brand-primary px-5 py-6 md:px-10 md:py-10 w-full md:max-w-[466px] rounded-none md:rounded-tr-[140px] flex flex-col gap-2">
          <OptimizedImage
            src={`${basePath}/images/icon-camera.png`}
            alt="Ícone de câmera"
            width={80}
            height={50}
            className="w-16 md:w-20 lg:w-24 h-auto invert brightness-200 mt-[-50px] md:mt-[-60px] lg:mt-[-75px] ml-[-5px]"
          />

          <p className="font-body font-medium text-base md:text-2xl lg:text-[32px] lg:leading-tight text-white">
            <span className="font-bold uppercase">
              Mais segurança
              <br />
              e tranquilidade
            </span>
          </p>

          <p className="font-body font-medium text-sm md:text-2xl lg:text-[28px] lg:leading-tight text-white mt-1 md:mt-2">
            Videomonitoramento
            <br /> 24 horas e vigilância nas noites e finais de semana.
          </p>
        </div>
      </div>
    </section>
  );
}
