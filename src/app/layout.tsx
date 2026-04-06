import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import AppShell from "@/src/components/AppShell";
import { ShopStateProvider } from "@/src/components/shop/ShopStateProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seijaku",
  description: "Quiet commerce for fragrance, objects, textiles, and guided ritual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ShopStateProvider>
          <AppShell>{children}</AppShell>
        </ShopStateProvider>
      </body>
    </html>
  );
}
