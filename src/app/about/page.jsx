import React from "react";
import { BookOpen, Heart, Users, Shield } from "lucide-react";

const BRAND = {
  violet: "#622ad8",
  magenta: "#a8258e",
};

const FEATURES = [
  {
    icon: BookOpen,
    title: "Preserve Your Wisdom",
    description:
      "Capture the lessons life teaches you before they fade — turn fleeting realizations into lasting reflections.",
  },
  {
    icon: Heart,
    title: "Reflect Mindfully",
    description:
      "Revisit your own growth over time, and rediscover the moments that shaped who you've become.",
  },
  {
    icon: Users,
    title: "Learn From Others",
    description:
      "Browse wisdom shared by a community of thoughtful people navigating careers, relationships, and life.",
  },
  {
    icon: Shield,
    title: "Your Space, Your Rules",
    description:
      "Keep lessons private for yourself, or share them publicly to help someone else avoid the same mistakes.",
  },
];

const AboutSection = () => {
  const brandGradient = `linear-gradient(135deg, ${BRAND.violet}, ${BRAND.magenta})`;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-sm font-medium mb-2 tracking-wide uppercase"
            style={{ color: BRAND.magenta }}
          >
            About Wisdom Vault
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Where life&apos;s lessons{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradient }}
            >
              don&apos;t go to waste
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We all learn valuable lessons — about ourselves, our work, our
            relationships — and then forget them, repeating the same mistakes
            months later. Wisdom Vault is a quiet space to write those lessons
            down, organize them, and return to them whenever you need a
            reminder of how far you&apos;ve come.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="relative border border-gray-300 rounded-2xl p-6 overflow-hidden group hover:border-gray-500 transition-colors"
            >
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundImage: brandGradient }}
              />
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                style={{ backgroundImage: brandGradient }}
              >
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* MISSION STATEMENT STRIP */}
        <div
          className="mt-14 rounded-2xl p-8 sm:p-10 text-center"
          style={{ backgroundImage: brandGradient }}
        >
          <p className="text-lg sm:text-xl font-semibold text-white max-w-2xl mx-auto leading-relaxed">
            &quot;The wisdom you gain today is the guidance you&apos;ll need
            tomorrow. Wisdom Vault helps you keep it close.&quot;
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;