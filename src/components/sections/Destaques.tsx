export default function Destaques() {
  const boxes = [
    "Loteamento aberto",
    "A partir de 250m\u00B2",
    "Comerciais e Residenciais",
  ];

  return (
    <section className="w-full bg-white py-10 md:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Titulo */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-[39px] lg:leading-tight text-black">
            <span className="font-bold">
              O bairro mais desejado de Itatiba
            </span>
            <br />
            <span className="font-normal">
              Pronto para construir a casa dos seus sonhos!
            </span>
          </h2>
        </div>

        {/* Boxes */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch">
          {boxes.map((text) => (
            <div
              key={text}
              className="flex items-center justify-center bg-brand-primary px-6 py-5 md:py-6 md:flex-1"
            >
              <span className="font-heading font-medium text-lg md:text-xl lg:text-[24px] text-white text-center">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
