// import HeroBanner from "@/components/sections/HeroBanner";
// import FeaturesSection from "@/components/sections/FeaturesSection";
// import Footer from "@/components/layout/Footer";

export default function LandingPageContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Compose sections in order here:
        <HeroBanner />
        <FeaturesSection />
        <SocialProofSection />
        <FAQSection />
        <LeadCaptureForm />
        <Footer />
      */}
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-primary font-heading">
            Solomo LP Boilerplate
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Pronto para criar uma nova landing page. Execute{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">/init-project</code>{" "}
            para começar.
          </p>
        </div>
      </section>
    </main>
  );
}
