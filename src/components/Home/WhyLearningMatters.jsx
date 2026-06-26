"use client";

import {
  Brain,
  Lightbulb,
  Compass,
  TrendingUp,
} from "lucide-react";
const BRAND_GRADIENT_CLASS = "bg-gradient-to-br from-[#622ad8] to-[#a8258e]";

const benefits = [
  {
    title: "Preserve Valuable Wisdom",
    description:
      "Capture important life lessons and experiences so they remain accessible whenever you need guidance.",
    icon: Brain,
  },
  {
    title: "Learn From Real Experiences",
    description:
      "Discover insights from people who have faced challenges, made mistakes, and grown from them.",
    icon: Lightbulb,
  },
  {
    title: "Make Better Decisions",
    description:
      "Use past lessons as a compass to navigate future opportunities and obstacles.",
    icon: Compass,
  },
  {
    title: "Support Continuous Growth",
    description:
      "Transform reflections into actions that help you improve personally and professionally.",
    icon: TrendingUp,
  },
];

export default function WhyLearningMatters() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-medium mb-2 tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
            Why Learning Matters
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Learning From
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
              Life Matters
            </span>
          </h2>


          <p className="text-gray-500">
            Every experience teaches something valuable. By preserving life
            lessons, reflecting on personal growth, and learning from others,
            we can make better decisions and create a more meaningful future.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group p-8 rounded-3xl border bg-background hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${BRAND_GRADIENT_CLASS}`}
                >
                  <Icon size={20} className="text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}