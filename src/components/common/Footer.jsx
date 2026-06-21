import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { FaXTwitter } from "react-icons/fa6";

const BRAND_GRADIENT_CLASS = "bg-gradient-to-br from-[#622ad8] to-[#a8258e]";

// Link with an animated gradient bottom-border on hover, used for Quick Links + Legal.
// Pure CSS: a gradient bg-image is always present but clipped to 0 width via
// background-size, then expanded on hover — no JS needed.
const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="inline-block text-gray-300 hover:text-white transition-colors pb-0.5 bg-gradient-to-r from-[#622ad8] to-[#a8258e] bg-no-repeat bg-left-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-300"
  >
    {children}
  </Link>
);

// Social icon button — gradient background fades in via opacity on hover (pure CSS)
const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="relative w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white transition-colors overflow-hidden group"
  >
    <span
      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${BRAND_GRADIENT_CLASS}`}
    />
    <span className="relative z-10">{children}</span>
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* LOGO + ABOUT */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0 ${BRAND_GRADIENT_CLASS}`}
              >
                W
              </span>
              <span className="text-lg font-bold text-white">
                Wisdom Vault
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              A space to preserve personal wisdom, reflect mindfully, and
              grow by learning from the experiences of others.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FooterLink href="/">Home</FooterLink>
              </li>
              <li>
                <FooterLink href="/lessons">Public Lessons</FooterLink>
              </li>
              <li>
                <FooterLink href="/pricing">Pricing / Upgrade</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FooterLink href="/terms">Terms &amp; Conditions</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </li>
            </ul>
          </div>

          {/* CONTACT + SOCIAL */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-gray-500" />
                support@wisdomvault.com
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-gray-500" />
                +880 1000-000000
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gray-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-5">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <FaFacebook size={16} />
              </SocialIcon>
              <SocialIcon href="#" label="X">
                <FaXTwitter size={15} />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <LiaLinkedin size={20} />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <BsInstagram size={15} />
              </SocialIcon>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Digital Life Lessons. All rights
            reserved.
          </p>
          <p>Built with care, for mindful growth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;