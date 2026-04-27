import Image from "next/image";

export default function CondicoesPagamento() {
  const condicoes = [
    "Entrada facilitada",
    "Parcelas direto com a loteadora",
    "Financiamento em até 100x",
  ];

  return (
    <section className="w-full flex flex-col md:flex-row min-h-[360px] lg:min-h-[480px]">
      {/* Coluna 1 — Imagem fixed (parallax) no desktop, completa no mobile */}
      <div
        className="order-last md:order-first md:w-[45%] md:shrink-0"
        style={{
          backgroundColor: "#fcf9e6",
          backgroundImage: "url(/planta-quinta.jpg)",
          backgroundAttachment: "fixed",
          backgroundSize: "45vw auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left top",
        }}
      >
        {/* Mobile: imagem por completo, sem corte */}
        <Image
          src="/planta-quinta.jpg"
          alt="Planta da Quinta dos Bons Ventos"
          width={1200}
          height={900}
          className="w-full h-auto md:hidden"
          priority
        />
      </div>

      {/* Coluna 2 — Título centralizado */}
      <div className="flex items-center justify-center md:w-[20%] px-6 pt-8 pb-2 md:py-10 lg:px-8 bg-white">
        <h2 className="font-body text-[28px] font-extrabold uppercase leading-tight text-black md:text-[20px] lg:text-[26px]">
          Condições<br />especiais de<br />pagamento
        </h2>
      </div>

      {/* Separador vertical — não toca as bordas */}
      <div className="hidden md:block self-center h-[200px] lg:h-[260px] w-[2px] bg-[#BC9249] shrink-0 mx-6 lg:mx-8" />

      {/* Coluna 3 — Lista de condições */}
      <div className="flex flex-col justify-center items-center md:items-start flex-1 px-8 pt-2 pb-8 md:py-10 lg:px-12 bg-white">
        <div className="w-fit">
          {condicoes.map((item, index) => (
            <div key={index}>
              {index > 0 && (
                <div className="my-4 h-[2px] w-full bg-[#BC9249] lg:my-5" />
              )}
              <p className="font-heading text-lg font-normal text-black md:text-xl lg:text-2xl">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
