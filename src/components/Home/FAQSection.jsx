"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is Wisdom Vault?",
      answer:
        "Wisdom Vault is a Digital Life Lessons platform where users can create, store, and share meaningful life experiences and personal growth stories.",
    },
    {
      question: "Is this platform free or paid?",
      answer:
        "Users start with a Free plan. They can upgrade to Premium using Stripe to unlock premium lessons and features.",
    },
    {
      question: "What is a Premium lesson?",
      answer:
        "Premium lessons are exclusive content visible only to Premium users and the creator. Free users will see them locked or blurred.",
    },
    {
      question: "Can I create private lessons?",
      answer:
        "Yes. You can set lessons as Public or Private. Private lessons are only visible to you.",
    },
    {
      question: "How does authentication work?",
      answer:
        "We use Better Auth with email/password and Google login. Protected routes are secured using authentication middleware.",
    },
    {
      question: "Can I like and save lessons?",
      answer:
        "Yes. Users can like lessons, comment on them, and save them to favorites for later reading.",
    },
    {
      question: "What happens after upgrading to Premium?",
      answer:
        "After successful Stripe payment, your account becomes Premium and you gain access to premium lessons and features.",
    },
    {
      question: "Can I edit or delete my lessons?",
      answer:
        "Yes. From My Lessons dashboard, you can update, edit, change visibility, or delete your lessons anytime.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#622ad8] to-[#a8258e]">
              Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 mt-2">
            Everything you need to know about Wisdom Vault
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 hover:border-gray-500 rounded-xl shadow-sm transition"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="font-medium">
                  {item.question}
                </span>

                <span className="text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              <div
                className={`px-5 pb-5 text-sm leading-relaxed transition-all duration-300 ${openIndex === index ? "block" : "hidden"
                  }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}