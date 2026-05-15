import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import KnotsSection from "@/components/KnotsSection";
import SpotsSection from "@/components/SpotsSection";
import ReadingSection from "@/components/ReadingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <KnotsSection />
        <SpotsSection />
        <ReadingSection />
      </main>
      <Footer />
    </>
  );
}
