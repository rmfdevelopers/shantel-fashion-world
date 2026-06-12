import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata = {
  title: 'Shantel Fashion World | Abuja Luxury Boutique',
  description: "Abuja's premier destination for curated luxury bags, designer footwear, and trending editorial fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}