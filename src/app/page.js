import Navbar from "@/components/common/Navbar";
import FeaturedLessonsSection from "@/components/Home/FeaturedLessonsSection";
import ImpactSection from "@/components/Home/ImpactSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <ImpactSection />
     <FeaturedLessonsSection />
    </div>
  );
}
