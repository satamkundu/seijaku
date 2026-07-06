"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  category: string;
  items: FaqItem[];
};

const faqData: FaqCategory[] = [
  {
    category: "Scent & Craftsmanship",
    items: [
      {
        question: "How are Seijaku's fragrances created?",
        answer: "Our fragrances are developed in collaboration with master perfumers, drawing deep inspiration from Bengalian heritage, local literature, and native flora (such as the Juiful/jasmine). We curate each scent profile to offer a quiet, lingering presence rather than an overwhelming synthetic intervention.",
      },
      {
        question: "Are the objects handmade?",
        answer: "Yes. The core of Seijaku is Bengal's living heritage. Many of our objects—including our Dokra ornaments, terracotta diffuser vessels, and seasonal accessories—are crafted individually by hand in artisan clusters. Slight variations in shape, texture, and finish are natural markers of this craftsmanship and make each object uniquely yours.",
      },
      {
        question: "How should I care for my Seijaku textiles?",
        answer: "Our handwoven textiles are delicate and crafted from natural fibers. We recommend dry cleaning, or gentle hand-washing in cold water with mild detergents. Do not twist or wring the fabrics, and always dry them in shade to preserve their natural colors and textures.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        question: "How is shipping calculated?",
        answer: "Shipping is calculated at checkout based on your exact delivery pincode and the total weight of the selected items. Once you enter your details in the checkout flow, the shipping cost will update dynamically before you complete the payment.",
      },
      {
        question: "Can I edit my shipping address after placing an order?",
        answer: "Address changes can be processed as long as the package hasn't left our warehouse in Kolkata (typically within 24 hours of placing the order). Please email us immediately at lifeatseijaku@gmail.com with your order number and updated address.",
      },
      {
        question: "What is your refund/return policy?",
        answer: "Due to the small-batch and artisanal nature of our products, all sales are generally final. However, we want you to have a seamless experience. If you receive an item that is defective or damaged during transit, please contact us within 48 hours of delivery with pictures or a short unboxing video, and we will arrange a replacement or refund.",
      },
    ],
  },
  {
    category: "Rituals & Experiences",
    items: [
      {
        question: "What is a Daily Ritual?",
        answer: "A Daily Ritual is our guided approach to intentional living. We design physical anchors (like diffusers, brass stands, and scents) to complement mental pauses. You can experience the guided 'Daily Ritual Room' on our home page, which offers a 2-minute space of stillness.",
      },
      {
        question: "How can I join the Seijaku community?",
        answer: "We invite you to sign up for 'Seijaku Weeklies' in our footer. It is a quiet mid-week reset delivered to your inbox every Wednesday. You can also follow our journals, watch our craft videos on YouTube, and engage with us on Instagram.",
      },
    ],
  },
];

export default function FaqAccordionClient() {
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({});

  const toggleItem = (catIndex: number, itemIndex: number) => {
    const key = `${catIndex}-${itemIndex}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-12">
      {faqData.map((categoryGroup, catIndex) => (
        <div key={categoryGroup.category} className="space-y-4">
          <h2 className="font-serif text-[22px] font-normal tracking-[-0.01em] text-[#1c1c1c] border-b border-black/5 pb-2">
            {categoryGroup.category}
          </h2>
          <div className="divide-y divide-black/5">
            {categoryGroup.items.map((item, itemIndex) => {
              const key = `${catIndex}-${itemIndex}`;
              const isOpen = !!openIndexes[key];

              return (
                <div key={item.question} className="py-4">
                  <button
                    onClick={() => toggleItem(catIndex, itemIndex)}
                    className="flex w-full items-center justify-between text-left font-sans text-[15px] font-normal leading-[1.4] text-[#1d1a17] hover:text-[#365b3f]"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#8a8378] transition-transform duration-350 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-350 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[14px] font-light leading-[1.8] text-[#5d574e] max-w-none">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
