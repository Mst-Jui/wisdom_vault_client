import React from "react";
import { BookOpen, Users, Heart, Award } from "lucide-react";

const BRAND_GRADIENT_CLASS = "bg-gradient-to-br from-[#622ad8] to-[#a8258e]";

const IMPACT_STATS = [
  {
    icon: BookOpen,
    value: "12,400+",
    label: "Lessons Preserved",
  },
  {
    icon: Users,
    value: "3,200+",
    label: "Active Members",
  },
  {
    icon: Heart,
    value: "48,000+",
    label: "Reflections Liked",
  },
  {
    icon: Award,
    value: "5",
    label: "Lesson Categories",
  },
];

const ImpactSection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-sm font-medium mb-2 tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
            Our Impact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Our impact in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
              members
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Every lesson shared on Wisdom Vault helps someone else grow a
            little faster. Here&apos;s what our community has built together.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {IMPACT_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="relative  border border-gray-300 rounded-2xl p-6 overflow-hidden group hover:border-gray-500 transition-colors text-center"
            >
              <div
                className={`absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${BRAND_GRADIENT_CLASS}`}
              />
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${BRAND_GRADIENT_CLASS}`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                {value}
              </p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;