import Navbar from "@/components/common/Navbar";
import CommunityFeedback from "@/components/Home/CommunityFeedback";
import FAQSection from "@/components/Home/FAQSection";
import FeaturedLessonsSection from "@/components/Home/FeaturedLessonsSection";
import HeroBanner from "@/components/Home/HeroBanner";
import ImpactSection from "@/components/Home/ImpactSection";
import MostSavedLessonsSection from "@/components/Home/MostSavedLessonsSection";
import TopContributorsSection from "@/components/Home/TopContributorsSection";
import WhyLearningMatters from "@/components/Home/WhyLearningMatters";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <ImpactSection />
      <FeaturedLessonsSection />
      <WhyLearningMatters />
      <TopContributorsSection />
      <CommunityFeedback />
      <MostSavedLessonsSection />
      <FAQSection />
    </div>
  );
}
