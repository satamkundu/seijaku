import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Agreements | Seijaku",
  description: "Terms and conditions governing the use of Seijaku's website, products, and services.",
};

export default function TermsAndAgreementsPage() {
  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[90px] text-[#3a3a3a] sm:pt-[100px]">
      <section className="section-primary pb-8 pt-16 sm:pt-20">
        <div className="page-container max-w-[800px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Information</p>
          <h1 className="mt-5 text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.03em] text-[#1d1a17]">
            Terms & Agreements
          </h1>
          <p className="mt-4 text-[13px] tracking-[0.02em] text-[#7c7368]">
            Last updated: July 2026
          </p>
          <div className="mt-10 h-px w-full bg-black/6" />
        </div>
      </section>

      <section className="pb-24 pt-4">
        <div className="page-container max-w-[800px]">
          <div className="prose prose-stone max-w-none space-y-10 text-[15px] font-light leading-[1.85] text-[#5d574e] sm:text-[16px]">
            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                1. Introduction
              </h2>
              <p className="mt-4">
                Welcome to Seijaku. These Terms & Agreements govern your use of our website located at{" "}
                <Link href="/" className="text-[#365b3f] hover:underline">
                  seijaku.life
                </Link>{" "}
                and the purchase of our products, including artisanal fragrances, handcrafted objects, textiles, and guided experiences. By accessing or using our services, you agree to be bound by these terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                2. Acceptance of Terms
              </h2>
              <p className="mt-4">
                By purchasing our goods or using our site, you represent that you are at least the age of majority in your state or province of residence. We reserve the right to update, change, or replace any part of these Terms by posting updates to our website. It is your responsibility to check this page periodically for changes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                3. Products and Craftsmanship
              </h2>
              <p className="mt-4">
                Our products are created with high attention to detail. Many of our objects, such as our Dokra ornaments and terracotta vessels, are formed by hand using traditional processes. Consequently, slight variations in color, texture, shape, and finish are inherent characteristics of these artisanal products and should not be considered defects.
              </p>
              <p className="mt-3">
                We make every effort to display the colors and images of our products as accurately as possible. We cannot guarantee that your device’s display of any color will be perfectly accurate.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                4. Orders and Payments
              </h2>
              <p className="mt-4">
                We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
              </p>
              <p className="mt-3">
                All prices are displayed in Indian Rupees (INR) unless specified otherwise. Prices for our products are subject to change without notice. Payments are securely processed through integrated payment gateways, and you agree to provide current, complete, and accurate purchase and account information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                5. Intellectual Property
              </h2>
              <p className="mt-4">
                All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, and editorial literature, is the property of Seijaku and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of Seijaku.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                6. Limitation of Liability
              </h2>
              <p className="mt-4">
                Seijaku does not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. In no case shall Seijaku, our partners, officers, employees, or artisans be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost profits, lost revenue, lost savings, or loss of data arising from your use of any of our services or products.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                7. Governing Law
              </h2>
              <p className="mt-4">
                These Terms & Agreements and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India, with jurisdiction in Kolkata, West Bengal.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                8. Contact Information
              </h2>
              <p className="mt-4">
                Questions about the Terms & Agreements should be sent to us at{" "}
                <a href="mailto:lifeatseijaku@gmail.com" className="text-[#365b3f] hover:underline">
                  lifeatseijaku@gmail.com
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-6 border-t border-black/6 pt-8">
            <Link href="/" className="text-[13px] font-normal tracking-[0.05em] text-[#365b3f] hover:underline">
              ← Return Home
            </Link>
            <Link href="/shop" className="text-[13px] font-normal tracking-[0.05em] text-[#365b3f] hover:underline">
              Explore our Collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
