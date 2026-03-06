import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade — Quinta dos Bons Ventos",
  description: "Política de privacidade e proteção de dados pessoais.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-20 font-body text-foreground">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-primary mb-8">
        Política de Privacidade
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">
          Proteção de Dados Pessoais
        </h2>
        <p className="leading-relaxed mb-4">
          A sua privacidade é importante para nós. É política da{" "}
          <strong>Quinta dos Bons Ventos</strong> respeitar a sua privacidade em
          relação a qualquer informação que possamos coletar em nosso site e
          outras plataformas que possuímos e operamos.
        </p>
        <p className="leading-relaxed mb-4">
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemos isso por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </p>
        <p className="leading-relaxed">
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado. Quando armazenamos dados, protegemos
          dentro de meios comercialmente aceitáveis para evitar perdas e roubos,
          bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">
          Informações Coletadas
        </h2>
        <p className="leading-relaxed mb-4">
          As informações pessoais que coletamos podem incluir, mas não se
          limitam a:
        </p>
        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Número de telefone</li>
          <li>
            Outras informações fornecidas voluntariamente através de formulários
          </li>
        </ul>
        <p className="leading-relaxed mt-4">
          Não compartilhamos informações de identificação pessoal publicamente
          ou com terceiros, exceto quando exigido por lei.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">Anúncios</h2>
        <p className="leading-relaxed">
          Podemos utilizar serviços de publicidade de terceiros para exibir
          anúncios quando você visita nosso site. Esses terceiros podem usar
          cookies e tecnologias semelhantes para coletar informações (não
          incluindo seu nome, endereço, e-mail ou telefone) sobre suas visitas a
          este e outros sites, a fim de fornecer anúncios sobre produtos e
          serviços de seu interesse.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">
          Cookies e Web Beacons
        </h2>
        <p className="leading-relaxed mb-4">
          Como qualquer outro site, utilizamos cookies. Esses cookies são usados
          para armazenar informações, incluindo preferências dos visitantes e as
          páginas acessadas. As informações são usadas para otimizar a
          experiência dos usuários, personalizando o conteúdo da nossa página
          com base no tipo de navegador e/ou outras informações.
        </p>
        <p className="leading-relaxed">
          Você pode optar por desativar os cookies nas configurações do seu
          navegador. No entanto, isso pode afetar a funcionalidade de alguns
          recursos do site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">
          Links Externos
        </h2>
        <p className="leading-relaxed">
          Nosso site pode conter links para sites externos que não são operados
          por nós. Esteja ciente de que não temos controle sobre o conteúdo e
          práticas desses sites e não podemos aceitar responsabilidade por suas
          respectivas políticas de privacidade.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-brand-primary mb-3">
          Consentimento
        </h2>
        <p className="leading-relaxed">
          Ao utilizar nosso site, você concorda com a nossa política de
          privacidade e aceita seus termos. Se tiver dúvidas, entre em contato
          conosco.
        </p>
      </section>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:opacity-80 transition-opacity"
        >
          ← Voltar à página inicial
        </Link>
      </div>
    </main>
  );
}
