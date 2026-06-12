'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Truck, 
  Sparkles, 
  Instagram, 
  Package, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Menu, 
  X,
  ImageOff,
  ChevronRight
} from 'lucide-react';

const brief = {
  name: "Shantel Fashion World",
  tagline: "Elegance defined, curated for the modern elite.",
  description: "Your premier destination in Abuja for luxury designer bags, shoes, and trending apparel that blends timeless sophistication with contemporary flair.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦",
  whatsapp: "2347061200116",
  instagram: "shantel_fashion_world",
  address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria",
  heroImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  availableImages: [
    "https://images.unsplash.com/photo-1761370571873-5d869310d731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1761370980868-185ab857e4cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1574487086609-ae8c9be52e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

const products = [
  { name: "Signature Designer Handbag", description: "Exquisite leather craftsmanship meeting gold-toned hardware.", price: "₦145,000", image: "https://images.unsplash.com/photo-1562869323-d3d7be3e88a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Midnight Velvet Stilettos", description: "Step into luxury with our exclusive trending footwear collection.", price: "₦65,000", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Luxe Editorial Gown", description: "A statement piece designed for high-profile events and galas.", price: "₦120,000", image: "https://images.unsplash.com/photo-1634407277669-89009cbb1285?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
  { name: "Classic Gold Timepiece", description: "The ultimate accessory to complement your designer ensemble.", price: "₦85,000", image: "https://images.unsplash.com/photo-1670404160620-a3a86428560e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
];

const features = [
  { title: "Curated Selection", description: "Handpicked designer pieces that stay ahead of the global trend curve.", icon: ShoppingBag },
  { title: "Nationwide Delivery", description: "Seamless shipping across Nigeria, bringing luxury to your doorstep.", icon: Truck },
  { title: "VIP Styling", description: "Personalized fashion consulting to match your unique persona.", icon: Sparkles }
];

const testimonials = [
  { name: "Amina Bello", text: "The only place in Gwarimpa I trust for authentic designer bags. The service is as premium as the products.", role: "Fashion Enthusiast" },
  { name: "Chidi Okoro", text: "Quality and style delivered exactly as promised. My go-to for luxury gifts.", role: "Regular Client" },
  { name: "Folake Adenuga", text: "Exceptional curation. Every piece I've bought here makes a statement.", role: "Creative Director" }
];

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
  }, []);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
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

function SectionDivider() {
  return (
    <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <span className="text-secondary font-mono text-[10px] tracking-[0.6em] uppercase whitespace-nowrap opacity-70">
        Shantel Fashion World
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

export default function ShantelFashion() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal(0.1);
  const featRev = useScrollReveal(0.15);
  const prodRev = useScrollReveal(0.1);
  const galleryRev = useScrollReveal(0.15);
  const aboutRev = useScrollReveal(0.15);
  const testRev = useScrollReveal(0.15);
  const contactRev = useScrollReveal(0.1);

  return (
    <main className="min-h-screen bg-primary text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-secondary flex items-center justify-center">
              <span className="text-secondary font-heading font-bold text-xl">S</span>
            </div>
            <span className="font-heading font-bold text-lg tracking-wider hidden sm:block">SHANTEL</span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {['Collection', 'Our Story', 'Gallery', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-[11px] uppercase tracking-[0.3em] font-medium text-white/70 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a href="#products" className="hidden sm:block bg-secondary text-black px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
              Shop Now
            </a>
            <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <div className="w-10 h-10 border border-secondary flex items-center justify-center">
            <span className="text-secondary font-heading font-bold text-xl">S</span>
          </div>
          <button onClick={() => setMobileMenu(false)} className="text-white">
            <X size={32} />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[70vh] gap-8">
          {['Collection', 'Our Story', 'Gallery', 'Contact'].map(link => (
            <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-3xl font-heading font-bold tracking-widest hover:text-secondary transition-colors">
              {link}
            </a>
          ))}
          <a onClick={() => setMobileMenu(false)} href="#products" className="mt-8 bg-secondary text-black px-12 py-4 font-bold uppercase tracking-widest">
            Shop Now
          </a>
        </nav>
      </div>

      {/* Hero Section (HR-B with V6 Reveal) */}
      <section id="home" ref={heroRev.ref} className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-1000 ease-out overflow-hidden ${heroRev.isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
          <SafeImage src={brief.heroImage} alt="Luxury Boutique" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter">
            Elevate Your <br/><span className="text-secondary">Style</span> Quotient
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-xl max-w-xl leading-relaxed font-light">
            Explore a world of luxury where designer quality meets impeccable taste. Based in the heart of Gwarimpa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a href="#products" className="bg-secondary text-black px-12 py-5 font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-secondary/10">
              Shop the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-12 py-5 font-medium tracking-widest text-sm hover:bg-white/5 transition-all">
              Our Vision
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Features (V4 Staggered) */}
      <section id="features" ref={featRev.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`group flex flex-col items-center text-center transition-all duration-1000 ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="w-20 h-20 mb-8 border border-white/10 flex items-center justify-center relative group-hover:border-secondary transition-all duration-500">
                    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon size={32} className="text-secondary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed max-w-xs">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products (P-STAGGER + V2 Scale) */}
      <section id="collection" ref={prodRev.ref} className="py-28 px-6 bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-heading text-5xl md:text-7xl font-bold leading-none">The Boutique <br/><span className="text-secondary italic">Showcase</span></h2>
            <p className="text-white/40 max-w-xs md:text-right font-light italic">Trending arrivals and timeless designer classics.</p>
          </div>

          <div className="space-y-32">
            {products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ease-out ${prodRev.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-full border border-secondary/20 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-secondary text-xs font-bold tracking-[0.5em] uppercase mb-6 block">0{i + 1} — COLLECTION</span>
                  <h3 className="font-heading text-4xl md:text-6xl font-black mb-6 leading-tight">{p.name}</h3>
                  <p className="text-white/50 mb-10 text-xl font-light leading-relaxed">{p.description}</p>
                  <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                    <span className="text-4xl font-heading text-white">{p.price}</span>
                    <a href={`https://wa.me/${brief.whatsapp}?text=I'm interested in the ${p.name}`} className="bg-white text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-secondary transition-colors">
                      Inquire Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (V7 Blur Cascade) */}
      <section id="gallery" ref={galleryRev.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-bold mb-6">Style In Motion</h2>
            <div className="w-24 h-1 bg-secondary mx-auto" />
          </div>
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {brief.availableImages.map((src, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 120}ms` }}
                className={`break-inside-avoid group relative rounded-sm overflow-hidden transition-all duration-1000 ${galleryRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}>
                <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.5em] uppercase border border-white/50 px-4 py-2">View Look</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About (V3 Horizontal Split) */}
      <section id="ourstory" ref={aboutRev.ref} className="py-28 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <span className="text-secondary font-mono text-[10px] tracking-[0.5em] uppercase mb-6 block">The Heritage</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-10 leading-none">Defined by <br/><span className="italic">Sophistication</span></h2>
            <p className="text-white/60 text-lg leading-relaxed mb-12 font-light">
              Shantel Fashion World isn&apos;t just a store; it&apos;s a statement. Located at Soar Plaza, we bridge the gap between high-street affordability and luxury designer aesthetics for the discerning Abuja shopper.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
              {[
                { n: '3k+', l: 'Social' },
                { n: '500+', l: 'Items' },
                { n: '100%', l: 'Authentic' }
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-heading font-bold text-secondary mb-1">{s.n}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 border border-secondary/20 translate-x-6 translate-y-6" />
            <SafeImage src={brief.availableImages[1]} alt="Boutique Look" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials (V8 Rotate Fade) */}
      <section id="testimonials" ref={testRev.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-bold mb-20">Voices of Style</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`transition-all duration-700 ${testRev.isVisible ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-6 scale-95'}`}>
                <div className="relative p-12 bg-zinc-950 border border-white/5">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-secondary flex items-center justify-center text-black">
                    <span className="text-4xl font-serif">&ldquo;</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-heading italic text-white/80 leading-relaxed mb-8">
                    {t.text}
                  </p>
                  <div>
                    <p className="font-bold text-secondary text-sm uppercase tracking-widest">{t.name}</p>
                    <p className="text-white/30 text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact (C2 + V5 Slant) */}
      <section id="contact" ref={contactRev.ref} className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactRev.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-tight">Visit the <br/><span className="text-secondary italic">Showroom</span></h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-secondary shrink-0" size={24} />
                <p className="text-white/60 text-lg leading-relaxed">Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria</p>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-secondary shrink-0" size={24} />
                <p className="text-white/60 text-lg">@shantel_fashion_world</p>
              </div>
              <a href={`https://wa.me/${brief.whatsapp}`} className="flex items-center gap-4 group">
                <Phone className="text-secondary shrink-0 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-white/60 text-lg group-hover:text-secondary transition-colors">+{brief.whatsapp}</p>
              </a>
            </div>
            <div className="mt-16 bg-zinc-900/50 backdrop-blur-sm p-8 border border-white/5 inline-block">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.4em] mb-2">Our Hours</p>
              <p className="text-white font-medium">Monday — Saturday: 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border border-secondary flex items-center justify-center">
                  <span className="text-secondary font-heading font-bold text-lg">S</span>
                </div>
                <span className="font-heading font-bold text-xl tracking-wider">SHANTEL</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Elegance defined, curated for the modern elite. Abuja&apos;s home for premium luxury.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-secondary hover:text-secondary transition-all">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12 md:gap-24">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.5em] text-secondary font-bold mb-6">Navigation</h4>
                <nav className="flex flex-col gap-4">
                  {['Collection', 'Our Story', 'Gallery', 'Contact'].map(l => (
                    <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} className="text-sm text-white/50 hover:text-white transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.5em] text-secondary font-bold mb-6">Help</h4>
                <nav className="flex flex-col gap-4">
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Shipping</a>
                  <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Authenticity</a>
                </nav>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
            <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">© {new Date().getFullYear()} Shantel Fashion World. Sharp delivery, nationwide.</p>
            <p className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Design Editorial v3.0</p>
          </div>
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
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-zinc-950 rounded-sm border border-secondary/20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mb-8 border border-secondary/40 relative z-10">
          <CheckCheck size={40} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4 relative z-10">Message Received</h3>
        <p className="text-white/50 max-w-sm text-lg relative z-10 leading-relaxed">Our concierge team will review your inquiry and reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-primary p-8 md:p-12 border border-white/5 shadow-2xl relative">
      <h3 className="font-heading text-2xl font-bold mb-8">Direct Inquiry</h3>
      <div className="space-y-4">
        {(['name', 'email', 'phone'] as const).map(field => (
          <input
            key={field}
            type={field === 'email' ? 'email' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            required={field !== 'phone'}
            className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-white/30 text-sm outline-none transition-all focus:border-secondary"
          />
        ))}
        <textarea rows={4} placeholder="What piece are you looking for?"
          value={form.message}
          onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
          required
          className="w-full bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-all focus:border-secondary"
        />
      </div>
      <button type="submit" disabled={loading}
        className="w-full mt-8 bg-secondary text-black py-5 font-black text-sm uppercase tracking-[0.3em] hover:brightness-110 transition-all disabled:opacity-50 flex justify-center items-center gap-3">
        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send Message <ArrowRight size={18} /></>}
      </button>
    </form>
  );
}