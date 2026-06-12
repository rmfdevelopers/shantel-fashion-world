'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  Gem, 
  Menu, 
  X, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Users,
  Package,
  BadgeCheck
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: editorial

const brand = {
  name: "Shantel Fashion World",
  tagline: "Redefining Elegance for the Modern Silhouette",
  description: "Abuja's premier destination for curated luxury bags, statement footwear, and trending designer apparel. We blend high-street trends with timeless luxury.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "2347061200116",
  instagram: "shantel_fashion_world",
  address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1611855363188-b25d9f25781e?q=80&w=1080",
  gallery: [
    "https://images.unsplash.com/photo-1603545078901-3b93beb4d898?q=80&w=1080",
    "https://images.unsplash.com/photo-1583977634128-8191c8367188?q=80&w=1080",
    "https://images.unsplash.com/photo-1631997281430-976c8b341de7?q=80&w=1080",
    "https://images.unsplash.com/photo-1767049603596-79204ada5273?q=80&w=1080",
    "https://images.unsplash.com/photo-1721103428106-dea4eda3bfa8?q=80&w=1080"
  ],
  products: [
    "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=1080",
    "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1080",
    "https://images.unsplash.com/photo-1770294758967-6ed2b93ce42c?q=80&w=1080",
    "https://images.unsplash.com/photo-1572966059657-6e8910c8c3c0?q=80&w=1080"
  ]
};

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/10 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-secondary text-xl rounded-sm">S</div>
            <span className="font-heading font-black text-2xl tracking-tighter hidden sm:block">SHANTEL</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collection', 'Store', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium tracking-widest uppercase hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="bg-primary text-secondary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Visit Boutique
            </a>
            <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-secondary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-secondary text-xl rounded-sm">S</div>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="space-y-8 flex-1">
            {['Home', 'Collection', 'Store', 'Contact'].map(link => (
              <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase()}`} className="block text-4xl font-heading font-black tracking-tighter">
                {link}
              </a>
            ))}
          </div>
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-white/40 mb-4">Gwarimpa, Abuja</p>
            <div className="flex gap-4">
              <Instagram size={20} className="text-primary" />
              <Phone size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-secondary via-secondary/95 to-primary/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[60vh] rounded-[4rem] overflow-hidden rotate-3">
          <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter italic uppercase">
            Elevate Your <span className="text-primary">Silhouette</span>
          </h1>
          <p className="text-white/50 mt-10 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            {brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-14">
            <a href="#products" className="bg-primary text-secondary px-12 py-5 font-black text-base uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl shadow-primary/20">
              Shop the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-12 py-5 font-medium text-base uppercase tracking-widest hover:bg-white/5 transition-all duration-300 rounded-full">
              Our Philosophy
            </a>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-primary py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-secondary/10 text-center">
          {[
            { number: '3k+', label: 'Fashion Followers' },
            { number: '100%', label: 'Authentic Quality' },
            { number: '500+', label: 'Monthly Shipments' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6 md:py-0">
              <p className="text-5xl font-black text-secondary tracking-tighter">{s.number}</p>
              <p className="text-secondary/60 text-xs mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features - F-BENTO */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">The Shantel Experience</h2>
            <p className="text-white/40 text-lg tracking-wide max-w-xl mx-auto">Why style-conscious Nigerians choose us for their signature looks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-primary/10 rounded-3xl p-12 border border-primary/20 hover:border-primary/40 transition-all duration-700 flex flex-col justify-between group min-h-[350px] ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Gem className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white uppercase italic">Curated Selection</h3>
                <p className="text-white/50 mt-4 text-xl leading-relaxed max-w-lg">Every piece is handpicked from global fashion hubs to ensure exclusivity and trend-leading style in Gwarimpa.</p>
              </div>
            </div>
            
            <div className={`bg-zinc-900 rounded-3xl p-8 border border-white/5 hover:bg-zinc-800 transition-all duration-500 flex flex-col justify-between min-h-[350px] delay-200 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <Truck className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-white uppercase">Nationwide Delivery</h3>
                <p className="text-white/40 text-sm mt-3 leading-relaxed">Swift and secure shipping from our Abuja hub to your doorstep across Nigeria. Sorted.</p>
              </div>
            </div>

            <div className={`bg-zinc-900 rounded-3xl p-8 border border-white/5 hover:bg-zinc-800 transition-all duration-500 flex flex-col justify-between min-h-[350px] delay-400 ${featuresReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <Sparkles className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-white uppercase">Personal Styling</h3>
                <p className="text-white/40 text-sm mt-3 leading-relaxed">Tailored fashion advice to help you build a wardrobe that speaks for your status and ambition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery - Bonus Section */}
      <section id="store" ref={galleryReveal.ref} className="py-28 px-6 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Store Showcase</h2>
              <p className="text-white/40 mt-6 text-xl">Visit us at Soar Plaza, Gwarimpa for an immersive luxury experience.</p>
            </div>
            <a href="https://wa.me/2347061200116" className="group flex items-center gap-3 text-primary font-bold tracking-widest uppercase border-b-2 border-primary/20 pb-2">
              Book a Viewing <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden border border-white/10 transition-all duration-1000 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <SafeImage src={src} alt={`Store interior ${i + 1}`} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - P-STAGGER */}
      <section id="collection" ref={productsReveal.ref} className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center">
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">Trending Now</h2>
            <p className="text-white/30 font-mono text-sm tracking-[0.4em] uppercase mt-4">Abuja's baddest arrivals, sorted.</p>
          </div>

          {[
            { 
              name: "Signature Gold-Clasp Handbag", 
              price: "₦125,000", 
              desc: "Exquisite leather craftsmanship with premium gold hardware finish.",
              img: IMAGES.products[0]
            },
            { 
              name: "Midnight Velvet Stilettos", 
              price: "₦45,000", 
              desc: "High-octane glamour for your most prestigious evening events.",
              img: IMAGES.products[1]
            },
            { 
              name: "Designer Two-Piece Silk Set", 
              price: "₦65,000", 
              desc: "Flowing silk silhouette designed for effortless daytime luxury.",
              img: IMAGES.products[2]
            },
            { 
              name: "Elite Leather Travel Tote", 
              price: "₦85,000", 
              desc: "Spacious, durable, and unmistakably chic for the modern traveler.",
              img: IMAGES.products[3]
            }
          ].map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24`}>
              <div className={`w-full md:w-1/2 relative transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'}`}>
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl group border border-white/5">
                  <SafeImage src={p.img} alt={p.name} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-primary/10 rounded-[3rem] -z-10 blur-3xl`} />
              </div>
              
              <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 translate-x-20' : 'opacity-0 -translate-x-20'}`}>
                <span className="font-mono text-primary text-xs font-bold tracking-[0.5em] uppercase mb-6 block">Arrival — 0{i + 1}</span>
                <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-[0.9] uppercase italic">{p.name}</h3>
                <p className="text-white/50 mt-8 text-xl leading-relaxed font-light">{p.desc}</p>
                <div className="mt-10 flex flex-col gap-8">
                  <span className="text-4xl font-black text-white tracking-tighter">{p.price}</span>
                  <a href={`https://wa.me/2347061200116?text=I'm interested in the ${p.name}`} className="bg-primary text-secondary px-10 py-5 rounded-full font-black uppercase tracking-widest w-fit hover:scale-110 transition-transform">
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section - Editorial Style */}
      <section id="about" ref={aboutReveal.ref} className="py-32 px-6 bg-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <SafeImage src={IMAGES.gallery[4]} alt="Editorial background" fill className="object-cover" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h2 className="font-heading text-6xl md:text-[5.5rem] font-black text-white leading-[0.85] uppercase tracking-tighter italic">
                Our Fashion <span className="text-primary">Philosophy</span>
              </h2>
            </div>
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <p className="text-white/60 text-xl leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                Founded in Abuja, Shantel Fashion World was born from a passion for bringing international luxury standards to the Nigerian market. We believe every woman deserves to look like a masterpiece without compromise.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-white text-lg font-bold">Exclusivity</p>
                  <p className="text-white/40 text-sm mt-2">Limited drops for those who lead the trend, never follow.</p>
                </div>
                <div>
                  <p className="text-white text-lg font-bold">Heritage</p>
                  <p className="text-white/40 text-sm mt-2">Crafting Abuja's fashion narrative since our inception.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - T-MASONRY */}
      <section id="testimonials" ref={testimonialReveal.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">The Muse Diaries</h2>
            <p className="text-white/40 mt-4 uppercase tracking-[0.3em] text-sm">Real voices from our community</p>
          </div>
          
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              { name: "Nneka Obi", role: "Lagos", text: "The quality of the bags I bought is unmatched. They look even better in person than on Instagram! Shipping to Lagos was smooth." },
              { name: "Aisha Mohammed", role: "Abuja", text: "Best fashion store in Gwarimpa. Their service is as premium as their clothes. Always my first stop for special events." },
              { name: "Tunde Bakare", role: "Port Harcourt", text: "Got a gift for my wife here; the personal styling advice helped me pick the perfect pair of shoes. She was impressed!" },
              { name: "Chidi Okafor", role: "Enugu", text: "Truly redefine luxury for the Nigerian silhouette. The silk sets are breathable yet expensive in feel." },
              { name: "Sarah J.", role: "Abuja", text: "Finally a store that understands high-street luxe. Their boutique at Soar Plaza is gorgeous." }
            ].map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`break-inside-avoid bg-zinc-900 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex gap-1.5 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
                <p className="text-white/80 text-lg leading-relaxed relative z-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black border border-primary/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-white text-lg tracking-tight uppercase">{t.name}</p>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - C4 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-[10vw] md:text-[8vw] font-black text-secondary leading-[0.8] mb-12 uppercase italic tracking-tighter">
              Get in <br /> <span className="text-white/60">Touch</span>
            </h2>
            <div className="space-y-8 border-l-4 border-secondary/20 pl-8">
              <div className="group flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-secondary/50 text-xs font-bold uppercase tracking-widest">WhatsApp / Call</p>
                  <p className="text-secondary text-2xl font-black">{contact.whatsapp}</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-secondary/50 text-xs font-bold uppercase tracking-widest">Boutique Address</p>
                  <p className="text-secondary text-lg font-black max-w-xs">{contact.address}</p>
                </div>
              </div>
              <div className="group flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 bg-secondary text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-secondary/50 text-xs font-bold uppercase tracking-widest">Social Media</p>
                  <p className="text-secondary text-2xl font-black italic">@{contact.instagram}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-secondary text-2xl rounded-sm">S</div>
              <span className="font-heading font-black text-3xl tracking-tighter uppercase italic">Shantel Fashion</span>
            </div>
            <p className="text-white/40 max-w-md text-lg leading-relaxed">
              Redefining luxury standards for Abuja's most stylish silhouettes. Shop premium footwear, handbags, and designer sets.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest mb-8">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Collection', 'Store', 'Contact'].map(l => (
                <li key={l}><a href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white uppercase tracking-widest mb-8">Connect</h4>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm font-mono tracking-widest">
            © {new Date().getFullYear()} SHANTEL FASHION WORLD. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/20 text-xs uppercase tracking-[0.4em]">
            Developed in Abuja
          </p>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-secondary rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 border border-primary/40 relative z-10">
          <CheckCheck size={40} className="text-primary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10 uppercase tracking-tighter">Inquiry Sent</h3>
        <p className="text-white/40 max-w-xs text-lg relative z-10 italic">Thank you. Our luxury stylists will respond to your request within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-black text-white mb-10 uppercase tracking-tighter">Fashion Inquiry</h3>
        <div className="space-y-5">
          {[
            { id: 'name', type: 'text', label: 'Full Name' },
            { id: 'phone', type: 'text', label: 'Phone Number' }
          ].map(field => (
            <input
              key={field.id}
              type={field.type}
              placeholder={field.label}
              value={(form as any)[field.id]}
              onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all focus:bg-white/10 focus:border-primary/50"
            />
          ))}
          <textarea
            rows={4}
            placeholder="What style are you looking for?"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all focus:bg-white/10 focus:border-primary/50"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-primary text-secondary py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3">
          {loading ? <Loader2 className="animate-spin" size={24} /> : <>Send Inquiry <ArrowRight size={20} /></>}
        </button>
      </div>
    </form>
  );
}