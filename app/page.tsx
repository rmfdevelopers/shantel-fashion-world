'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Gem, 
  Truck, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  CheckCheck, 
  Loader2,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-QUOTE
// Typography Personality: refined

const brief = {
  brand: {
    name: "Shantel Fashion World",
    tagline: "Step Into Pure Opulence",
    description: "Abuja's premier destination for curated luxury bags, designer footwear, and trending editorial fashion for the modern elite.",
    industry: "fashion",
    region: "nigeria",
    currency: "₦"
  },
  colors: {
    primary: "#0A0A0A",
    secondary: "#D4AF37",
    accent: "#F5F5F5"
  },
  contact: {
    whatsapp: "2347061200116",
    instagram: "@shantel_fashion_world",
    email: "",
    address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  },
  products: [
    { name: "Signature Designer Tote", description: "Handcrafted leather tote with gold-tone hardware and spacious interior.", price: "₦245,000", url: "https://images.unsplash.com/photo-1761646238175-5d25cf3566f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
    { name: "Italian Stiletto Heels", description: "Sleek pointed-toe pumps designed for ultimate comfort and statement style.", price: "₦185,000", url: "https://images.unsplash.com/photo-1629737168267-a9cc18033938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
    { name: "Editorial Silk Gown", description: "Floor-length silk dress featuring a modern silhouette and premium finish.", price: "₦320,000", url: "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" },
    { name: "Luxe Urban Sneakers", description: "High-fashion chunky sneakers blending street style with luxury materials.", price: "₦95,000", url: "https://images.unsplash.com/photo-1657242700848-68ea132c9966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg" }
  ],
  features: [
    { title: "Curated Luxury", description: "Every piece is hand-selected to ensure it meets our strict editorial standards.", icon: Gem },
    { title: "Nationwide Delivery", description: "Sharp delivery, nationwide from our Gwarimpa hub to your doorstep.", icon: Truck },
    { title: "Personal Styling", description: "Exclusive access to fashion consultants to help you build a timeless wardrobe.", icon: Sparkles }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1632905351666-9b11f8a64ee3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1629737168267-a9cc18033938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1647412983566-1957e341807c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1746455783868-c8049bdb8f3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
    "https://images.unsplash.com/photo-1728488448472-16a259c6ba7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
  ]
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#111] to-[#222] ${fallbackClassName ?? className ?? ''}`}>
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

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Collection", href: "#products" },
    { name: "Lookbook", href: "#gallery" },
    { name: "Visit Us", href: "#contact" }
  ];

  // Section reveals assignment
  const sHero = useScrollReveal(0);
  const sFeatures = useScrollReveal(0.2);
  const sGallery = useScrollReveal(0.1);
  const sProducts = useScrollReveal(0.1);
  const sAbout = useScrollReveal(0.2);
  const sTestimonials = useScrollReveal(0.2);
  const sContact = useScrollReveal(0.2);

  return (
    <main className="bg-primary text-white">
      {/* HEADER */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform">
              <span className="text-primary font-black text-xl font-heading">S</span>
            </div>
            <span className="font-heading font-black text-xl tracking-tight hidden sm:block">SHANTEL <span className="text-secondary">WORLD</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-white/70 hover:text-secondary transition-colors tracking-wide">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-secondary/10">
              Shop Now
            </a>
            <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
             <span className="font-heading font-black text-2xl tracking-tight">SHANTEL</span>
             <button onClick={() => setMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="text-4xl font-heading font-bold text-white/50 hover:text-secondary transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pb-10">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-4">Abuja HQ</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-[240px]">
              {brief.contact.address}
            </p>
          </div>
        </div>
      </div>

      {/* HERO - HR-A Variant */}
      <section id="home" ref={sHero.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[140px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.07] max-w-5xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-2 pointer-events-none">
          <SafeImage src={brief.heroImage.url} alt="Luxury fashion world" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <h1 className={`font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter transition-all duration-1000 ${sHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            THE EPICENTER <br/> OF <span className="text-secondary italic">ELITE STYLE</span>
          </h1>
          <p className={`text-white/50 mt-10 text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${sHero.isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {brief.brand.description}
          </p>
          <div className={`flex flex-col sm:flex-row gap-5 justify-center mt-12 transition-all duration-1000 delay-500 ${sHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="#products" className="bg-secondary text-primary px-12 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl shadow-secondary/20 flex items-center justify-center gap-2">
              Explore Collection <ArrowRight size={20} />
            </a>
            <a href="#gallery" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/5 transition-all duration-300 rounded-full flex items-center justify-center">
              View Lookbook
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER - D-QUOTE */}
      <div className="py-24 px-8 text-center bg-secondary/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <p className="relative font-heading text-3xl md:text-5xl font-black text-white max-w-4xl mx-auto leading-tight italic">
          &ldquo;{brief.brand.tagline}&rdquo;
        </p>
        <p className="relative text-secondary/40 mt-6 text-xs tracking-[0.5em] uppercase font-bold">{brief.brand.name}</p>
      </div>

      {/* FEATURES - F-BENTO Variant */}
      <section ref={sFeatures.ref} className="py-28 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="font-heading text-5xl font-black text-white mb-4">WHY SHANTEL?</h2>
            <p className="text-white/40 text-lg">Uncompromising quality for the modern trendsetter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`md:col-span-2 bg-secondary/10 rounded-3xl p-10 border border-secondary/20 hover:border-secondary/40 transition-all duration-500 flex flex-col justify-between group min-h-[300px] ${sFeatures.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Gem className="text-secondary" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white">{brief.features[0].title}</h3>
                <p className="text-white/50 mt-4 text-lg max-w-md">{brief.features[0].description}</p>
              </div>
            </div>
            <div className="space-y-5">
              {brief.features.slice(1).map((f, i) => (
                <div key={i} className={`bg-white/5 rounded-3xl p-8 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all duration-300 flex flex-col justify-between min-h-[142px] group ${sFeatures.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:text-secondary transition-colors">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{f.title}</h3>
                    <p className="text-white/45 text-sm mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY - MASONRY Variant */}
      <section id="gallery" ref={sGallery.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <h2 className={`font-heading text-6xl md:text-7xl font-black text-white leading-none transition-all duration-700 ${sGallery.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
              THE <span className="text-secondary italic">LOOKBOOK</span>
            </h2>
            <p className="text-white/40 max-w-xs text-sm font-medium uppercase tracking-[0.2em] md:text-right">High-definition aesthetics for the editorial eye.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.gallery.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${sGallery.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Lookbook item ${i + 1}`} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="bg-secondary/90 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">Collection 2024</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-EDITORIAL Variant */}
      <section id="products" ref={sProducts.ref} className="py-28 px-6 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-heading text-6xl font-black text-white mb-20 tracking-tighter">FEATURED ARRIVALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brief.products.map((p, i) => (
              <div key={i} className={`group relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-1000 ${sProducts.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage src={p.url} alt={p.name} fill
                  className="object-cover group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 relative z-10">
                  <h3 className="text-4xl font-heading font-black text-white">{p.name}</h3>
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100">
                    <p className="text-white/60 mt-4 text-lg leading-relaxed max-w-md">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <span className="text-secondary font-black text-3xl">{p.price}</span>
                    <a href={`https://wa.me/${brief.contact.whatsapp}?text=I am interested in the ${p.name}`} className="bg-white text-primary px-8 py-3 rounded-full font-black text-sm hover:bg-secondary hover:text-primary transition-all duration-300">
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - V3 Variant with V9 Stats */}
      <section id="about" ref={sAbout.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${sAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl font-black text-white leading-tight mb-8">WHERE <span className="text-secondary italic">LUXURY</span> MEETS HERITAGE</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Located in the heart of Gwarimpa, Shantel Fashion World began with a single mission: to bring world-class designer aesthetics to the Nigerian woman. We bridge the gap between high-street trends and luxury craftsmanship.
            </p>
            <div className="grid grid-cols-2 gap-10">
              {[
                { n: '3k+', l: 'Muses Served', i: Users },
                { n: '100%', l: 'Authentic', i: ShieldCheck }
              ].map((stat, i) => (
                <div key={i} className={`transition-all duration-1000 ${sAbout.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${600 + i * 200}ms` }}>
                  <div className="flex items-center gap-3 text-secondary mb-3">
                    <stat.i size={24} />
                    <span className="text-3xl font-heading font-black">{stat.n}</span>
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{stat.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-300 ${sAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="aspect-square relative rounded-full overflow-hidden border-8 border-white/5 p-4">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <SafeImage src={brief.gallery[4]} alt="Shantel Fashion Boutique" fill className="object-cover" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-secondary text-primary w-24 h-24 rounded-full flex items-center justify-center animate-float">
               <ShoppingBag size={40} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT Variant */}
      <section ref={sTestimonials.ref} className="py-28 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-secondary mx-auto mb-10" />
          <h2 className="font-heading text-5xl font-black text-white mb-20 tracking-tight">THE SHANTEL MUSE</h2>
          <div className="space-y-12">
            {[
              { name: "Chidi Okafor", text: "The only place in Abuja I trust for my designer bags. The quality is unmatched.", role: "Fashion Influencer" },
              { name: "Amara Bello", text: "Their customer service is just as premium as their shoes. A 10/10 shopping experience.", role: "Business Executive" }
            ].map((t, i) => (
              <div key={i} className={`relative py-12 px-10 rounded-[2.5rem] border border-white/5 bg-primary/40 backdrop-blur-md transition-all duration-1000 ${sTestimonials.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-4 border-primary shadow-xl">
                  <span className="text-primary text-2xl font-black leading-none italic">&ldquo;</span>
                </div>
                <p className="text-white/80 text-2xl leading-relaxed font-medium font-heading italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="font-heading font-black text-white text-xl tracking-wide">{t.name}</p>
                    <p className="text-secondary text-xs uppercase tracking-widest font-bold mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C3 Variant */}
      <section id="contact" ref={sContact.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-secondary font-bold text-xs tracking-[0.5em] uppercase mb-4">Visit Us</p>
            <h2 className="font-heading text-6xl font-black text-white mb-6">GET IN TOUCH</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-white/50 text-sm font-medium">
               <div className="flex items-center gap-2 justify-center">
                 <MapPin size={16} className="text-secondary" /> {brief.contact.address}
               </div>
               <div className="flex items-center gap-2 justify-center">
                 <Phone size={16} className="text-secondary" /> {brief.contact.whatsapp}
               </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${sContact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 shadow-2xl">
                  <CheckCheck size={44} className="text-secondary" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-lg">Our styling team will review your inquiry and respond via WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  {['name', 'email'].map(field => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none transition-all focus:border-secondary focus:bg-white/10"
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="WhatsApp Number"
                  value={form.phone}
                  onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none transition-all focus:border-secondary focus:bg-white/10"
                />
                <textarea
                  rows={5}
                  placeholder="Tell us about the piece you are looking for..."
                  value={form.message}
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none transition-all focus:border-secondary focus:bg-white/10 resize-none"
                />
                <button type="submit" disabled={loading}
                  className="w-full bg-secondary text-primary py-6 rounded-2xl font-black text-lg hover:brightness-110 hover:scale-[1.02] transition-all disabled:opacity-60 flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : "Send Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-28 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl">
                  <span className="text-primary font-black text-2xl font-heading">S</span>
                </div>
                <span className="font-heading font-black text-2xl tracking-tighter uppercase">SHANTEL <span className="text-secondary">FASHION</span></span>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm">
                Redefining the Abuja fashion landscape with curated luxury for the modern trendsetter.
              </p>
              <div className="flex gap-6 mt-10">
                <a href={`https://instagram.com/${brief.contact.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${brief.contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map(l => (
                  <li key={l.name}><a href={l.href} className="text-white/50 hover:text-secondary transition-colors text-sm">{l.name}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-8">Visit Us</h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {brief.contact.address}
              </p>
              <p className="mt-6 font-bold text-white text-xs uppercase tracking-widest">Opening Hours</p>
              <p className="text-white/40 text-xs mt-2">Mon — Sat: 10am — 7pm</p>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Shantel Fashion World. Abuja, Nigeria.
            </p>
            <div className="flex gap-10">
               <span className="text-white/20 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Privacy</span>
               <span className="text-white/20 text-xs tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}