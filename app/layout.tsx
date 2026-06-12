import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const headingFont = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});

const bodyFont = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: 'Shantel Fashion World | Abuja Luxury Boutique',
  description: 'Redefining Elegance for the Modern Silhouette. Abuja\'s premier destination for curated luxury bags, designer footwear, and trending apparel.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}