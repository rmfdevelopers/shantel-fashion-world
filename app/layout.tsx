import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700", "900"] 
});

const body = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Shantel Fashion World | Abuja's Street-Luxe Style",
  description: "Premier destination for curated designer bags, footwear, and luxury apparel in Gwarimpa, Abuja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}