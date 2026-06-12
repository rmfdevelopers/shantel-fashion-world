import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading' 
});

const body = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-body' 
});

export const metadata = {
  title: 'Shantel Fashion World | Abuja Luxury Street-Luxe',
  description: 'Exquisite designer bags, footwear, and trending apparel curated for the modern connoisseur.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}