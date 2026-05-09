import { HeroSection } from "@/components/home/HeroSection";
import { WhySection } from "@/components/home/WhySection";
import { FeaturedProfiles } from "@/components/home/FeaturedProfiles";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <FeaturedProfiles />
      <CTASection />
    </>
  );
}