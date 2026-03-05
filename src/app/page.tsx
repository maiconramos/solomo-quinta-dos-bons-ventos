import MaintenancePage from "@/components/sections/MaintenancePage";
import LandingPageContent from "@/components/sections/LandingPageContent";

const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

export default function Home() {
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return <LandingPageContent />;
}
