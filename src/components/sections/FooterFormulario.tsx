import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import LeadForm from "@/components/ui/LeadForm";
import { basePath } from "@/lib/env";

export default function FooterFormulario() {
  return (
    <section className="w-full bg-white">
      {/* Contato + Formulário */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0">
          {/* Coluna Esquerda - Contato */}
          <div className="w-full lg:w-1/2 lg:pr-10 xl:pr-14 mb-10 lg:mb-0">
            {/* Waze + Endereço */}
            <div className="flex flex-col items-center md:flex-row md:items-start gap-1 md:gap-3 mb-1 text-center md:text-left">
              <Image
                src={`${basePath}/images/icon-waze.svg`}
                alt="Waze"
                width={48}
                height={48}
                className="shrink-0 md:mt-1"
              />
              <div>
                <p className="font-heading font-bold text-xl md:text-2xl lg:text-[26px] text-black leading-snug">
                  Empreendimento
                </p>
                <p className="font-body font-light text-lg md:text-xl lg:text-[22px] text-black leading-snug">
                  Rua Luiz Jurassi Quinta dos Bons
                  <br />
                  Ventos, Itatiba - SP
                </p>
              </div>
            </div>

            {/* Saiba Mais + WhatsApp */}
            <div className="mt-16 text-center md:text-left">
              <p className="font-body font-normal text-2xl md:text-[28px] lg:text-[30px] text-black mb-2">
                SAIBA MAIS
              </p>
              <a
                href="https://wa.me/5519998591832"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <Image
                  src={`${basePath}/images/icon-whatsapp.svg`}
                  alt="WhatsApp"
                  width={44}
                  height={44}
                  className="shrink-0 w-8 h-8 md:w-11 md:h-11"
                />
                <span className="font-body font-bold text-2xl md:text-4xl lg:text-[44px] text-black group-hover:text-brand-primary transition-colors">
                  (19) 99859-1832
                </span>
              </a>
            </div>
          </div>

          {/* Separador vertical */}
          <div className="hidden lg:block w-[3px] bg-brand-accent self-stretch shrink-0" />

          {/* Coluna Direita - Formulário */}
          <div className="w-full lg:w-1/2 lg:pl-10 xl:pl-14">
            <h3 className="font-heading text-2xl md:text-[28px] lg:text-[30px] leading-snug text-brand-accent mb-6 text-center">
              <span className="font-bold">Cadastre-se</span> e receba
              <br />
              <span className="font-normal">mais informações</span>
            </h3>
            <LeadForm />
          </div>
        </div>
      </div>

      {/* Vendas */}
      <div className="py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center">
          <p className="font-heading font-normal text-2xl md:text-[28px] lg:text-[30px] text-black mb-6">
            Vendas:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <OptimizedImage
              src={`${basePath}/images/logo-guepardo.png`}
              alt="Guepardo Desenvolvimento Urbano"
              width={200}
              height={80}
              className="h-[100px] md:h-[112px] lg:h-[125px] w-auto"
            />
            <OptimizedImage
              src={`${basePath}/images/logo-gdu.png`}
              alt="GDU Itatiba"
              width={200}
              height={80}
              className="h-[80px] md:h-[90px] lg:h-[100px] w-auto"
            />
          </div>
        </div>
      </div>

      {/* Texto Legal */}
      <div className="py-6 md:py-8">
        <div className="max-w-[1080px] mx-auto px-2">
          <p className="font-body font-normal text-xs md:text-sm lg:text-[14px] text-black text-center leading-relaxed">
            Loteamento QUINTA DOS BONS VENTOS aprovado pelo GRAPROHAB n&ordm;
            229/2018 de 26 de junho de 2018 &ndash; Prefeitura do Munic&iacute;pio
            de Itatiba Decreto n&deg; 7.249, de 14 de agosto de 2.019 &ndash;
            Registrado no Cart&oacute;rio de Registro de Im&oacute;veis de Itatiba
            conforme Matr&iacute;cula R03 n&ordm; 59.382 de 29 de maio de 2020.
          </p>
          <p className="font-body font-normal text-xs md:text-sm lg:text-[14px] text-black text-center leading-relaxed mt-2">
            *As imagens contidas neste material publicit&aacute;rio s&atilde;o
            meramente ilustrativas, podendo sofrer altera&ccedil;&otilde;es. A
            vegeta&ccedil;&atilde;o retratada neste material publicit&aacute;rio
            &eacute; meramente ilustrativa e apresenta porte adulto.
          </p>
        </div>
      </div>
    </section>
  );
}
