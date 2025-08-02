import { HeroSection } from "@/components/hero/HeroSection";
import ClientPageContent from "./ClientPageContent"; // Import the new client component

export default function Home() {
  return (
    <main className="relative">

      {/* Favicon */}
      <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />

      <HeroSection />
      <ClientPageContent />
    </main>
  );
}
