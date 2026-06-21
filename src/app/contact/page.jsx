import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const BRAND = {
  violet: "#622ad8",
  magenta: "#a8258e",
};

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@wisdomvault.com",
    href: "mailto:support@wisdomvault.com",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+880 1000-000000",
    href: "tel:+8801000000000",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24–48 hours",
    href: null,
  },
];

const ContactSection = () => {
  const brandGradient = `linear-gradient(135deg, ${BRAND.violet}, ${BRAND.magenta})`;

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* HEADER */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <p
            className="text-sm font-medium mb-2 tracking-wide uppercase"
            style={{ color: BRAND.magenta }}
          >
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            We&apos;d love to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: brandGradient }}
            >
              hear from you
            </span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Questions, feedback, or just want to say hello? Here&apos;s how
            to reach the Wisdom Vault team.
          </p>
        </div>

        {/* CONTACT INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => {
            const content = (
              <div className="relative border border-gray-300 rounded-2xl p-6 overflow-hidden group hover:border-gray-500 transition-colors h-full">
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
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="font-medium break-words">{value}</p>
              </div>
            );

            return href ? (
              <a key={label} href={href} className="block">
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;