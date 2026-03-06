export default function CondicoesPagamento() {
  const condicoes = [
    "Entrada facilitada",
    "Parcelas direto com a loteadora",
    "Financiamento em até 100x",
  ];

  return (
    <section className="w-full bg-white px-6 py-12 md:px-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-[820px] flex-col items-start gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
        {/* Coluna esquerda — título */}
        <div className="md:w-[36%] shrink-0">
          <h2 className="font-body text-[22px] font-extrabold uppercase leading-tight text-black md:text-[32px] lg:text-[40px]">
            Condições especiais de pagamento
          </h2>
        </div>

        {/* Separador vertical — visível apenas em desktop */}
        <div className="hidden self-stretch border-l-2 border-[#BC9249] md:block" />

        {/* Coluna direita — lista de condições */}
        <div className="w-full flex-1">
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
