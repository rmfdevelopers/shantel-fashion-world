import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading" 
});

const bodyFont = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Shantel Fashion World | Abuja's Premier Luxury Boutique",
  description: "Curated collection of designer bags, shoes, and clothing in Gwarimpa, Abuja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans bg-primary text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}