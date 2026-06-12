'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  ImageOff,
  Star,
  Truck,
  User,
  Users,
  Package,
  Clock,
  Shirt,
  Scissors,
  Palette
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-QUOTE
// Typography Personality: refined

// --- HOOKS ---

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

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/10 ${fallbackClassName ?? className ?? ''}`}>
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

// --- CONTENT ---

const brief = {
  brand: {
    name: "Shantel Fashion World",
    tagline: "Redefining Elegance, One Piece at a Time",
    description: "Discover a curated collection of luxury bags, designer footwear, and trending apparel designed for the modern fashionista.",
    industry: "Fashion",
    region: "Nigeria"
  },
  contact: {
    whatsapp: "2347061200116",
    instagram: "@shantel_fashion_world",
    address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
  },
  features: [
    { title: "Curated Selection", description: "Every piece is hand-selected to ensure it meets our standards of modern luxury.", icon: Shirt },
    { title: "Nationwide Delivery", description: "Swift and secure shipping from our Gwarimpa boutique to your doorstep across Nigeria.", icon: Truck },
    { title: "Personal Styling", description: "Consult with our fashion experts to find the perfect ensemble for any occasion.", icon: User }
  ],
  products: [
    { name: "Designer Leather Tote", description: "Exquisite handcrafted leather bag featuring gold-tone hardware and spacious interior.", price: "₦120,000", image: "https://images.unsplash.com/photo-1778409588769-79e6dde71304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "Starlight Stilettos", description: "Elegant pointed-toe heels with crystal embellishments for your most glamorous nights.", price: "₦85,000", image: "https://images.unsplash.com/photo-1758789872879-1be800c7bbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "Editorial Silk Gown", description: "Floor-length evening dress in premium silk, cut to highlight the feminine silhouette.", price: "₦45,000", image: "https://images.unsplash.com/photo-1551084804-4b60b3c10f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    { name: "Gold-Rimmed Aviators", description: "High-fashion sunglasses offering 100% UV protection and a bold luxury statement.", price: "₦15,000", image: "https://images.unsplash.com/photo-1611222777277-61319d63ca94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1618236444721-4a8dba415c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1765282946813-d9ccda14c415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1758789872879-1be800c7bbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1639598003170-acfd39fcd7b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1560519622-7229023b9c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1774110101478-bb066db7ccf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  testimonials: [
    { name: "Amaka Okeke", role: "Loyal Customer", text: "The quality of the bag I bought is incredible. It looks even better in person than on Instagram!" },
    { name: "Zainab Musa", role: "Fashion Influencer", text: "Found my wedding guest outfit here. The personal styling advice was a lifesaver. Abuja's best kept secret!" },
    { name: "Chidi Benson", role: "Entrepreneur", text: "Fast delivery and the packaging was so premium. Definitely shopping here again." }
  ],
  stats: [
    { number: "3k+", label: "Fashion Followers", icon: Users },
    { number: "10k+", label: "Orders Delivered", icon: Package },
    { number: "5+", label: "Years of Style", icon: Clock }
  ]
};

// --- SECTIONS ---

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="bg-primary text-accent selection:bg-secondary selection:text-primary">
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-primary/95 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 border border-secondary flex items-center justify-center rounded-lg group-hover:bg-secondary transition-all">
              <span className="text-secondary group-hover:text-primary font-heading font-bold text-xl">S</span>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight hidden sm:block">SHANTEL</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Shop', 'About', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium uppercase tracking-[0.2em] text-white/60 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Shop Now
            </a>
            <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button onClick={() => setMobileMenu(false)} className="self-end mb-12 text-white">
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Home', 'Shop', 'About', 'Contact'].map(link => (
              <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase()}`} className="block font-heading text-4xl font-bold text-white hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-12 border-t border-white/10">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Gwarimpa, Abuja</p>
            <p className="text-white/60 text-sm leading-relaxed">{brief.contact.address}</p>
          </div>
        </div>
      </div>

      {/* HERO SECTION (HR-C) */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-16 pt-32 pb-16">
          <div className="animate-fadeIn">
            <p className="text-secondary font-mono text-xs tracking-[0.4em] uppercase mb-6 opacity-70">
              {brief.brand.industry} — Abuja
            </p>
            <h1 className="font-heading text-5xl md:text-[5rem] font-bold text-white leading-[0.95] tracking-tighter">
              Elevate Your <span className="text-secondary">Signature</span> Style
            </h1>
            <p className="text-white/45 mt-8 text-lg max-w-md leading-relaxed font-light">
              {brief.brand.description} Curated for the modern woman who values excellence.
            </p>
            <div className="flex gap-6 mt-12 flex-wrap">
              <a href="#products" className="bg-secondary text-primary px-10 py-4 font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-secondary/10">
                Shop the Collection
              </a>
              <a href="#about" className="border border-white/20 text-white px-10 py-4 font-medium rounded-full hover:bg-white/5 transition-all">
                The Story
              </a>
            </div>
            <div className="mt-20 flex gap-10 border-t border-white/10 pt-10">
              {brief.stats.slice(0, 2).map((s, i) => (
                <div key={i} className="group cursor-default">
                  <p className="font-heading text-4xl font-bold text-white group-hover:text-secondary transition-colors">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <SafeImage src="https://images.unsplash.com/photo-1593528625646-d705402054ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="High Fashion Model" fill className="object-cover animate-scaleIn" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* FEATURES SECTION (F-ICON-GRID) */}
      <section id="features" className="py-28 px-6 bg-secondary/5 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-bold text-white mb-4">The Shantel Experience</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brief.features.map((f, i) => {
              const Icon = f.icon;
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref as any} 
                  className={`p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-secondary/20 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all" />
                  <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mb-8 text-secondary group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed font-light">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION (P-STAGGER) */}
      <section id="shop" className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-6xl font-bold text-white leading-tight">New <span className="italic text-secondary">Arrivals</span></h2>
            <p className="text-white/40 mt-4 text-lg">Sharp delivery, nationwide. Explore our latest luxury drops.</p>
          </div>
          {brief.products.map((p, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div key={i} ref={ref as any} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl group cursor-zoom-in">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-all" />
                  </div>
                  <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl -z-10`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-secondary text-xs font-bold tracking-[0.4em] uppercase mb-4 block opacity-60">
                    Collection — 0{i + 1}
                  </span>
                  <h3 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6">{p.name}</h3>
                  <p className="text-white/50 text-lg leading-relaxed font-light mb-8 max-w-md ml-auto mr-auto md:ml-0 md:mr-0">{p.description}</p>
                  <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                    <span className="text-4xl font-bold text-white tracking-tight">{p.price}</span>
                    <a href="#contact" className="bg-white text-primary px-10 py-4 rounded-full font-bold hover:bg-secondary hover:text-primary transition-all flex items-center gap-3">
                      Enquire Now <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DIVIDER: D-QUOTE */}
      <div className="py-32 px-8 text-center bg-secondary/[0.03] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--secondary)/5,transparent_70%)]" />
        <p className="relative font-heading text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight italic">
          &ldquo;Fashion is the armor to survive the reality of everyday life.&rdquo;
        </p>
        <p className="relative text-secondary mt-8 text-sm tracking-[0.5em] uppercase font-bold">{brief.brand.name}</p>
      </div>

      {/* GALLERY SECTION (MASONRY) */}
      <section className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-white mb-16 text-center">Editorial <span className="text-secondary">Lookbook</span></h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.gallery.map((src, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref as any} className={`break-inside-avoid group relative rounded-2xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <SafeImage src={src} alt={`Gallery Piece ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs bg-accent px-4 py-2 rounded-full">View Details</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (V3: Horizontal Split) */}
      <section id="about" className="py-28 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden z-10 shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1618236444721-4a8dba415c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Boutique Interior" fill className="object-cover" />
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 border border-secondary/20 rounded-[3rem] -z-0" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary rounded-[2rem] flex items-center justify-center z-20 shadow-2xl animate-float">
              <ShoppingBag size={48} className="text-primary" />
            </div>
          </div>
          <div>
            <h2 className="font-heading text-5xl font-bold text-white mb-8">Redefining <span className="text-secondary italic">Style</span> in Abuja</h2>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
              <p>Located in the heart of Gwarimpa, Shantel Fashion World is more than a boutique; it&apos;s a destination for style. We bridge the gap between affordable luxury and high-end designer pieces.</p>
              <p>Our mission is simple: to ensure every woman feels powerful, elegant, and confident in what she wears. From the stitching of our silk gowns to the hardware on our bags, quality is never compromised.</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12">
              {brief.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-3xl font-bold text-secondary mb-1">{s.number}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION (T-MASONRY) */}
      <section className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-bold text-white">Client <span className="italic text-secondary">Stories</span></h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.testimonials.map((t, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref as any} className={`break-inside-avoid bg-white/[0.03] border border-white/5 p-10 rounded-[2rem] transition-all duration-700 hover:border-secondary/20 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(n => <Star key={n} size={14} className="fill-secondary text-secondary" />)}
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg border border-secondary/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                      <p className="text-secondary/60 text-xs font-mono uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (C2: Asymmetric Glass Overlap) */}
      <section id="contact" className="py-28 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-24 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <ContactForm />
          <div className="md:pl-12">
            <h2 className="font-heading text-6xl md:text-7xl font-bold text-white mb-10 leading-tight">Visit Our <span className="text-secondary">Boutique</span></h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2">Location</h4>
                  <p className="text-white/40 leading-relaxed max-w-xs">{brief.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2">WhatsApp</h4>
                  <p className="text-white/40 leading-relaxed">+{brief.contact.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all shrink-0">
                  <Instagram size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-white mb-2">Instagram</h4>
                  <p className="text-white/40 leading-relaxed">{brief.contact.instagram}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-secondary flex items-center justify-center rounded-lg">
                  <span className="text-secondary font-heading font-bold text-xl">S</span>
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight">SHANTEL</span>
              </a>
              <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed mb-10">
                {brief.brand.tagline}. Redefining luxury fashion for the modern era. Sharp delivery, nationwide.
              </p>
              <div className="flex gap-4">
                <a href={`https://wa.me/${brief.contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Phone size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Shop', 'About', 'Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-secondary transition-colors text-sm uppercase tracking-widest">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl font-bold text-white mb-8">Boutique Hours</h4>
              <ul className="space-y-4 text-sm text-white/40">
                <li className="flex justify-between"><span>Mon - Sat</span> <span>09:00 - 19:00</span></li>
                <li className="flex justify-between"><span>Sun</span> <span>By Appointment</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest">
              &copy; {new Date().getFullYear()} SHANTEL FASHION WORLD. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[10px] text-white/20 tracking-[0.2em] uppercase">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
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
      <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/[0.02] rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-50" />
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 relative z-10">
          <CheckCheck size={40} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-bold text-white mb-4 relative z-10">Thank You</h3>
        <p className="text-white/40 max-w-sm text-lg relative z-10 leading-relaxed font-light">We have received your message. Our stylist will get in touch with you shortly.</p>
        <button onClick={() => setSent(false)} className="mt-10 text-secondary font-bold underline underline-offset-4 relative z-10">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-primary/40 backdrop-blur-3xl p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-secondary/15 transition-all duration-700" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10">Send an <span className="text-secondary">Inquiry</span></h3>
        <div className="space-y-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary/30"
              />
            </div>
          ))}
          <div className="relative">
            <textarea rows={4} placeholder="Your message or product interest..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary/30"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-secondary text-primary py-5 rounded-2xl font-bold text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all duration-500 disabled:opacity-60 flex justify-center items-center gap-3">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} /> Processing...
            </span>
          ) : (
            <>
              Send Message <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}