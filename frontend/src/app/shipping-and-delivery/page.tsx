import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Delivery | Seijaku",
  description: "Information regarding domestic shipping, delivery times, calculated rates, and damage policies for Seijaku products.",
};

export default function ShippingAndDeliveryPage() {
  return (
    <main className="min-h-screen bg-[#f3efe7] pt-[90px] text-[#3a3a3a] sm:pt-[100px]">
      <section className="section-primary pb-8 pt-16 sm:pt-20">
        <div className="page-container max-w-[800px]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a785d]">Information</p>
          <h1 className="mt-5 text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.03em] text-[#1d1a17]">
            Shipping & Delivery
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
                1. Delivery Network & Zones
              </h2>
              <p className="mt-4">
                We currently ship to addresses across India. We partner with reliable domestic delivery networks to ensure that your fragrances, handcrafted objects, and textiles reach you safely and in perfect condition.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                2. Shipping Charges
              </h2>
              <p className="mt-4">
                Shipping rates are calculated dynamically at checkout based on your delivery pincode and the total weight of the order. The calculated amount is displayed before you complete your purchase. For remote or special delivery zones, standard regional surcharges may apply.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                3. Dispatch & Delivery Timelines
              </h2>
              <p className="mt-4">
                Standard orders are processed and dispatched from our facility in Kolkata within 2 to 3 business days.
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li>
                  <strong>Metro Cities:</strong> Typically delivered within 3 to 5 business days after dispatch.
                </li>
                <li>
                  <strong>Rest of India:</strong> Typically delivered within 5 to 7 business days after dispatch.
                </li>
              </ul>
              <p className="mt-3">
                Please note that seasonal drops, pre-ordered items, or custom handcrafted art pieces may carry extended processing times. If your order contains a pre-order item, the entire package will be shipped together once all items are ready.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                4. Order Tracking
              </h2>
              <p className="mt-4">
                Once your consignment is handed over to our delivery partner, you will receive an email and/or SMS confirmation containing a tracking link and docket number. You can monitor your shipment’s journey directly on the tracking portal.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                5. Transit Damage Policy
              </h2>
              <p className="mt-4">
                Many of our objects are exceptionally delicate, featuring natural terracotta, custom glass elements, and structural brass. We package every item with structural support and thick protective buffers to minimize any risk.
              </p>
              <p className="mt-3">
                In the rare event that your product arrives damaged, please record a clear unboxing video or take high-resolution photos of the packaging and item immediately. Send these details along with your order ID to{" "}
                <a href="mailto:lifeatseijaku@gmail.com" className="text-[#365b3f] hover:underline">
                  lifeatseijaku@gmail.com
                </a>{" "}
                within 48 hours of delivery. We will verify and arrange a replacement or refund for you promptly.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-[24px] font-normal tracking-[-0.01em] text-[#1c1c1c] sm:text-[28px]">
                6. Unsuccessful Deliveries & Address Edits
              </h2>
              <p className="mt-4">
                Our delivery partners will make up to three attempts to deliver your package. If you need to edit your delivery address, please contact us immediately. We can only update address details if the shipment has not yet left our warehouse. Once dispatched, any route modifications are subject to the carrier&apos;s capabilities and may incur additional charges.
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
