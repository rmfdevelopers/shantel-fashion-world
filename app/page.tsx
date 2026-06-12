'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, X, Phone, Instagram, Mail, MapPin, 
  ArrowRight, Truck, ShieldCheck, Sparkles, 
  CheckCheck, Loader2, ImageOff, ShoppingBag,
  Calendar, Users, BadgeCheck
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- Utilities ---

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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Components ---

const Navbar = ({ brand, navLinks }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-secondary flex items-center justify-center font-heading font-black text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
            S
          </div>
          <span className="font-heading text-xl font-bold tracking-tighter uppercase hidden sm:block">Shantel</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link: any) => (
            <a key={link.name} href={link.href} className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-secondary transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all rounded-full">
            Shop Now
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`fixed inset-0 bg-primary z-[200] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div className="w-10 h-10 border-2 border-secondary flex items-center justify-center font-heading font-black text-secondary">S</div>
            <button onClick={() => setIsOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link: any) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-4xl font-heading font-bold hover:text-secondary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pb-10">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-6">Connect</p>
            <div className="flex gap-6">
              <Instagram className="text-secondary" />
              <Phone className="text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const SectionDivider = ({ brand }: { brand: any }) => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto opacity-50">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    <span className="text-secondary font-sans text-[10px] tracking-[0.5em] uppercase whitespace-nowrap">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
  </div>
);

// --- Sections ---

const Hero = ({ brand, hero, heroImage }: any) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="hero" ref={ref} className="min-h-screen relative flex items-center justify-center bg-primary px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 max-w-5xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-2 border border-white/5">
        <SafeImage src={heroImage.url} alt={brand.name} fill className="object-cover" priority />
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <h1 className={`font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {hero.headline}
        </h1>
        <p className={`text-white/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {hero.subtext}
        </p>
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <a href="#products" className="bg-secondary text-primary px-12 py-5 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 rounded-full">
            {hero.cta_text}
          </a>
          <a href="#about" className="border border-white/20 text-white px-12 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all duration-300 rounded-full">
            The Story
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = ({ section, features }: any) => {
  const { ref, isVisible } = useScrollReveal();
  const iconMap: any = { Truck, ShieldCheck, Sparkles };

  return (
    <section id="features" ref={ref} className="py-28 bg-primary px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white">{section.title}</h2>
            <p className="text-secondary font-sans text-sm tracking-[0.3em] uppercase mt-4">{section.subtitle}</p>
          </div>
          <div className="hidden md:block w-32 h-px bg-white/20 mb-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f: any, i: number) => {
            const Icon = iconMap[f.icon] || Sparkles;
            return (
              <div 
                key={i} 
                className={`bg-[#111111] p-10 rounded-3xl border border-white/5 hover:border-secondary/20 transition-all duration-500 group transition-all ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center rounded-2xl mb-8 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Products = ({ section, products }: any) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white tracking-tighter italic">
            Lookbook
          </h2>
          <p className="text-white/30 text-sm tracking-[0.5em] uppercase mt-4">Curated Style Picks</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any, i: number) => (
            <div 
              key={i} 
              className={`group transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                <SafeImage src={p.image_url} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-6 right-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    <ShoppingBag size={20} />
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h3 className="font-heading text-xl font-bold text-white">{p.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-secondary font-black text-lg">{p.price}</p>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">Abuja Stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = ({ section, brand }: any) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-[#0D0D0D] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative">
            <div className="aspect-square relative rounded-[4rem] overflow-hidden border border-white/10 z-10 shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1526745925052-dd824d27b9ab" alt="Showroom" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-[80px] -z-10" />
          </div>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-5xl font-black text-white mb-8 leading-tight">
            {section.title}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-12">
            {section.description}
          </p>
          <div className="grid grid-cols-2 gap-8">
            {section.stats.map((s: any, i: number) => (
              <div key={i} className="space-y-1">
                <p className="font-heading text-4xl font-black text-secondary">{s.number}</p>
                <p className="text-white/40 text-xs uppercase tracking-[0.2em]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-2xl bg-white/5 border-l-4 border-secondary">
             <p className="text-white/80 italic font-light">"Best fashion plug in Abuja, sharp delivery nationwide."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryMasonry = ({ section, images }: any) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
           <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4 italic">{section.title}</h2>
           <div className="w-16 h-px bg-secondary" />
        </div>
        <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 transition-all duration-1000 ease-out overflow-hidden ${isVisible ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'}`}>
          {images.slice(0, 6).map((img: any, i: number) => (
            <div key={i} className="break-inside-avoid group relative rounded-3xl overflow-hidden border border-white/5 shadow-xl">
              <SafeImage src={img.url} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <BadgeCheck size={20} className="text-secondary" />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ section }: any) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-28 bg-[#0D0D0D] px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-black text-white mb-20">The Style Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {section.items.map((t: any, i: number) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`bg-primary p-10 rounded-3xl border border-white/5 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'
              }`}
            >
              <div className="absolute -top-4 left-10">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Sparkles size={16} />
                </div>
              </div>
              <p className="text-white/70 leading-relaxed italic mb-8 pt-4">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-secondary border border-white/10">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-secondary text-[10px] uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ brand, contact, section }: any) => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">{section.title}</h2>
          <p className="text-white/45 text-lg leading-relaxed max-w-sm mb-12">{brand.description}</p>
          
          <div className="space-y-6">
            <a href={`https://${contact.whatsapp}`} className="flex items-center gap-4 text-white/60 hover:text-secondary transition-all group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-secondary transition-colors">
                <Phone size={18} />
              </div>
              <span className="text-sm tracking-widest font-medium uppercase">{contact.whatsapp.replace('wa.me/c/', '')}</span>
            </a>
            <div className="flex items-center gap-4 text-white/60 group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                <Instagram size={18} />
              </div>
              <span className="text-sm tracking-widest font-medium uppercase">@{contact.instagram}</span>
            </div>
            <div className="flex items-start gap-4 text-white/60">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <span className="text-sm leading-relaxed max-w-xs">{contact.address}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
          
          {sent ? (
            <div className="bg-[#111111] p-12 rounded-[2rem] border border-white/10 text-center animate-scaleIn relative z-10 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-8 border border-secondary/20">
                <CheckCheck className="text-secondary" size={40} />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent</h3>
              <p className="text-white/50 max-w-xs mx-auto">We'll review your inquiry and get back to you shortly. Get ready to level up your style.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#111111] p-10 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative z-10">
              <h3 className="font-heading text-3xl font-bold text-white mb-10">Book an Appointment</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                />
                <textarea
                  rows={4}
                  placeholder="What are you looking for?"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none resize-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-8 bg-secondary text-primary py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-50 flex justify-center items-center gap-3 group"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ brand, contact }: any) => (
  <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 border-2 border-secondary flex items-center justify-center font-heading font-black text-secondary text-2xl">S</div>
            <span className="font-heading text-2xl font-bold uppercase tracking-tighter">{brand.name}</span>
          </div>
          <p className="text-white/40 max-w-sm leading-relaxed mb-8">
            Abuja's premier fashion house. Defining luxury through curated footwear and premium apparel.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary transition-all">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-8">The Showroom</p>
          <div className="space-y-4">
            <p className="text-white/40 text-sm leading-relaxed">{contact.address}</p>
            <p className="text-white/70 font-bold text-sm tracking-widest">{contact.whatsapp.replace('wa.me/c/', '')}</p>
          </div>
        </div>
        
        <div>
          <p className="text-secondary font-bold uppercase tracking-widest text-xs mb-8">Hours</p>
          <div className="space-y-2 text-sm text-white/40">
            <p className="flex justify-between"><span>Mon - Sat</span> <span>09:00 - 19:00</span></p>
            <p className="flex justify-between"><span>Sunday</span> <span>By Appointment</span></p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Shantel Fashion World. All Rights Reserved.
        </p>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">Curated by Design</p>
      </div>
    </div>
  </footer>
);

export default function Page() {
  const brief = {
    brand: {
      name: "Shantel Fashion World",
      tagline: "Curated Luxury. Trending Style. Effortless Elegance.",
      description: "The ultimate destination in Abuja for premium designer footwear, handbags, and contemporary fashion that defines your unique style.",
      industry: "fashion"
    },
    hero: {
      headline: "Step Into High Fashion",
      subtext: "Exclusive collections of designer shoes, luxury bags, and trending apparel in the heart of Gwarimpa.",
      cta_text: "Explore Lookbook"
    },
    contact: {
      whatsapp: "wa.me/c/2347061200116",
      instagram: "shantel_fashion_world",
      address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
    }
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Collection", href: "#products" },
    { name: "About", href: "#about" },
    { name: "Visit Us", href: "#contact" }
  ];

  const products = [
    { name: "Quilted Leather Handbag", price: "₦120,000", image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa" },
    { name: "Designer Stiletto Heels", price: "₦85,000", image_url: "https://images.unsplash.com/photo-1551489186-ccb95a1ea6a3" },
    { name: "Urban Chic Sneakers", price: "₦65,000", image_url: "https://images.unsplash.com/photo-1580140485763-63776b9cba67" },
    { name: "Evening Gala Gown", price: "₦150,000", image_url: "https://images.unsplash.com/photo-1603122630570-7fd434d470d0" }
  ];

  const features = [
    { title: "Nationwide Delivery", description: "Safe and prompt doorstep shipping to every state across Nigeria.", icon: "Truck" },
    { title: "Premium Quality", description: "Strictly curated designer pieces that guarantee luxury and longevity.", icon: "ShieldCheck" },
    { title: "Personal Styling", description: "Expert fashion advice to help you curate your dream wardrobe.", icon: "Sparkles" }
  ];

  const aboutSection = {
    title: "Modern Luxury Redefined",
    description: "Shantel Fashion World is more than just a boutique; it's a statement. Located in Gwarimpa, we bridge the gap between global runway trends and the sophisticated style of the modern Nigerian woman.",
    stats: [
      { number: "3k+", label: "Style Seekers" },
      { number: "5+", label: "Years of Fashion" },
      { number: "100%", label: "Curated Auth" },
      { number: "24h", label: "Abuja Delivery" }
    ]
  };

  const images = [
    { url: "https://images.unsplash.com/photo-1767458770505-4daf3e3a3f77" },
    { url: "https://images.unsplash.com/photo-1682364853446-db043f643207" },
    { url: "https://images.unsplash.com/photo-1722872098827-e3a04d1b49ee" },
    { url: "https://images.unsplash.com/photo-1617229378071-daa5eeff0db7" },
    { url: "https://images.unsplash.com/photo-1526745925052-dd824d27b9ab" },
    { url: "https://images.unsplash.com/photo-1737796348338-22e996496d8d" }
  ];

  const testimonialSection = {
    items: [
      { name: "Chiamaka Okafor", text: "The quality of the bags is unmatched. I get compliments every time I step out!", role: "Loyal Customer" },
      { name: "Oluwatobi Adeyemi", text: "Best fashion plug in Abuja. They always have the latest designer shoes before anyone else.", role: "Style Enthusiast" },
      { name: "Fatima Bello", text: "Fast delivery to Lagos and the packaging was so premium. Highly recommended!", role: "Entrepreneur" }
    ]
  };

  return (
    <main className="relative overflow-x-hidden">
      <Navbar brand={brief.brand} navLinks={navLinks} />
      <Hero brand={brief.brand} hero={brief.hero} heroImage={{ url: "https://images.unsplash.com/photo-1780679024697-a18a3484c117" }} />
      <Features section={{ title: "The Standard", subtitle: "Curated Excellence" }} features={features} />
      <SectionDivider brand={brief.brand} />
      <Products section={{ title: "Lookbook" }} products={products} />
      <About section={aboutSection} brand={brief.brand} />
      <GalleryMasonry section={{ title: "The Showroom" }} images={images} />
      <Testimonials section={testimonialSection} />
      <ContactForm brand={brief.brand} contact={brief.contact} section={{ title: "Visit Us" }} />
      <Footer brand={brief.brand} contact={brief.contact} />
    </main>
  );
}