'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  Menu, 
  X, 
  ImageOff, 
  Gem, 
  Truck, 
  User, 
  Shield, 
  ShoppingBag, 
  Award, 
  Users 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

// ===== HOOKS & UTILS =====

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
  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary ${fallbackClassName ?? className ?? 'w-full h-full'}`}>
        <ImageOff size={28} className="text-secondary/40" />
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

// ===== DATA =====

const brief = {
  brand: {
    name: "Shantel Fashion World",
    tagline: "The Pinnacle of Abuja's Street-Luxe Style",
    description: "Your premier destination for curated designer bags, trending footwear, and affordable luxury apparel. We bridge the gap between street style and high-fashion elegance.",
    industry: "fashion",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2347061200116",
    instagram: "shantel_fashion_world",
    email: "",
    address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
  },
  products: [
    { name: "Signature Quilted Leather Tote", description: "A timeless statement piece crafted from premium leather with gold-tone hardware.", price: "₦185,000", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1080" },
    { name: "Crystal Embellished Stiletto Pumps", description: "Step into the spotlight with our shimmering midnight crystal evening heels.", price: "₦75,000", image: "https://images.unsplash.com/photo-1540322112357-ebf4f8bfa63c?q=80&w=1080" },
    { name: "Satin Midnight Gala Gown", description: "Exquisite silk satin drape designed for high-profile events and red carpets.", price: "₦45,000", image: "https://images.unsplash.com/photo-1745560713582-17d7b416ba63?q=80&w=1080" },
    { name: "Urban Chrome Designer Runners", description: "The perfect fusion of street comfort and high-fashion luxury aesthetics.", price: "₦120,000", image: "https://images.unsplash.com/photo-1508125673219-7cec6bc90159?q=80&w=1080" }
  ],
  features: [
    { title: "Curated Selection", description: "Every piece in our collection is handpicked for its quality and trending status.", icon: <Gem size={24} /> },
    { title: "Nationwide Shipping", description: "Secure door-to-door delivery across all 36 states in Nigeria.", icon: <Truck size={24} /> },
    { title: "Personal Styling", description: "Get expert fashion advice from our in-house stylists for any occasion.", icon: <User size={24} /> },
    { title: "Authentic Quality", description: "We guarantee the highest grade materials for all our designer inspired pieces.", icon: <Shield size={24} /> }
  ]
};

// ===== COMPONENTS =====

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center font-heading font-black text-primary text-xl">S</div>
            <span className="font-heading font-bold text-white tracking-widest hidden sm:block uppercase">Shantel</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collection', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-secondary text-sm font-medium tracking-widest uppercase transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="#products" 
              className="bg-secondary text-primary px-6 py-2.5 font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all"
            >
              Shop Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[75%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setMobileOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Home', 'Collection', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-3xl font-heading font-bold text-white hover:text-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <p className="text-secondary font-bold tracking-widest uppercase text-xs mb-4">Visit Us</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Soar plaza shop B308 1st Avenue Gwarimpa, Abuja
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    <span className="text-secondary font-sans text-[10px] tracking-[0.5em] uppercase whitespace-nowrap opacity-60">
      {brief.brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
  </div>
);

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary/10 px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 max-w-4xl max-h-[60vh] rounded-[4rem] overflow-hidden rotate-3">
        <SafeImage 
          src="https://images.unsplash.com/photo-1711824031162-4e762150c38b?q=80&w=1080" 
          alt="Luxury Fashion" 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl pt-20">
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase italic">
            Elegance <span className="text-secondary">Redefined</span>
          </h1>
          <p className="text-white/50 mt-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Explore Abuja's most exclusive collection of designer bags, shoes, and luxury apparel. {brief.brand.tagline}.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#products" className="bg-secondary text-primary px-10 py-5 font-bold text-sm tracking-widest uppercase
              hover:scale-105 transition-all duration-300 shadow-2xl shadow-secondary/20">
              Shop the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-10 py-5 font-medium text-sm tracking-widest uppercase
              hover:bg-white/10 transition-all duration-300">
              Our Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="features" className="py-28 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tight">The Experience</h2>
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mt-2">Why fashionistas choose us</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {brief.features.map((f, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`p-8 bg-primary/40 backdrop-blur-md border border-white/5 group hover:border-secondary/30 transition-all duration-500 flex flex-col gap-6
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-500">
                {f.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="products" className="py-28 px-6 bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase mb-4 italic">Featured Showcase</h2>
          <div className="w-24 h-1 bg-secondary mx-auto" />
        </div>

        <div className="space-y-32">
          {brief.products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <SafeImage 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-secondary/5 rounded-[4rem] -z-10 blur-3xl`} />
              </div>
              
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-sans text-secondary text-sm font-bold tracking-[0.4em] uppercase mb-6 block">
                  Archive No. 0{i + 1}
                </span>
                <h3 className="font-heading text-4xl md:text-5xl font-black text-white leading-tight uppercase mb-6 italic">{p.name}</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg font-light">
                  {p.description}
                </p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                  <span className="text-4xl font-heading font-black text-white">{p.price}</span>
                  <a href="https://wa.me/2347061200116" className="bg-white text-primary px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-secondary hover:text-primary transition-all">
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?q=80&w=1080",
    "https://images.unsplash.com/photo-1632905351666-9b11f8a64ee3?q=80&w=1080",
    "https://images.unsplash.com/photo-1746455783868-c8049bdb8f3a?q=80&w=1080",
    "https://images.unsplash.com/photo-1629737168267-a9cc18033938?q=80&w=1080",
    "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?q=80&w=1080",
    "https://images.unsplash.com/photo-1647412983566-1957e341807c?q=80&w=1080"
  ];

  return (
    <section ref={ref} id="gallery" className="py-28 px-6 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl font-black text-white uppercase italic tracking-tight">Lookbook</h2>
          <p className="text-white/40 mt-4 tracking-widest uppercase text-xs">Glimpses into the world of Shantel Fashion</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((src, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`break-inside-avoid relative rounded-2xl overflow-hidden group transition-all duration-700
                ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}
            >
              <SafeImage 
                src={src} 
                alt={`Gallery ${i + 1}`} 
                width={600} 
                height={800}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-primary overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-none mb-10 italic">
            Our <span className="text-secondary">Fashion</span> Journey
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
            Located in the heart of Gwarimpa, Shantel Fashion World has spent years defining the aesthetic of Abuja's most stylish residents. We believe luxury shouldn't be out of reach—it should be a lifestyle.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10">
            {[
              { number: '3k+', label: 'Styling Community', icon: <Users size={20} /> },
              { number: '1k+', label: 'Curation Items', icon: <ShoppingBag size={20} /> },
              { number: '5', label: 'Years of Style', icon: <Award size={20} /> }
            ].map((stat, i) => (
              <div key={i} className={`transition-all duration-1000 delay-${i*150} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-secondary mb-2">{stat.icon}</div>
                <p className="font-heading text-3xl font-black text-white">{stat.number}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`relative aspect-square transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="absolute inset-0 border border-secondary/30 translate-x-4 translate-y-4" />
          <SafeImage 
            src="https://images.unsplash.com/photo-1606132653399-36248f2e2a99?q=80&w=1080" 
            alt="About Store" 
            fill 
            className="object-cover relative z-10" 
          />
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Chinelo Okoro", text: "The quality of the bags exceeded my expectations. Shantel is my only plug now!", role: "CEO, Abuja" },
    { name: "Tunde Balogun", text: "Fast delivery to Lagos and the packaging was pure luxury. Highly recommended.", role: "Creative Director" },
    { name: "Zainab Musa", text: "I found my perfect wedding shoes here. Incredible service and patient staff.", role: "Bride" }
  ];

  return (
    <section ref={ref} className="py-28 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <div>
          <h2 className="font-heading text-5xl font-black text-white uppercase italic">Style Stories</h2>
          <p className="text-secondary font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Verified Wardrobe Upgrades</p>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
          {[...items, ...items].map((t, i) => (
            <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-primary border border-white/5 p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1.5 mb-8">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 bg-secondary" />)}
                </div>
                <p className="text-white/70 text-lg leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8 mt-10">
                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center text-secondary font-heading font-black text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-xs">{t.name}</p>
                  <p className="text-white/30 text-[10px] uppercase mt-1 tracking-tighter">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
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
    <section id="contact" ref={ref} className="py-28 px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-20" />
      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <div className="bg-[#111111]/80 backdrop-blur-3xl p-10 sm:p-14 border border-white/10 shadow-2xl">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
                <div className="w-20 h-20 bg-secondary/20 flex items-center justify-center mb-6 border border-secondary/40 shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                  <CheckCheck size={32} className="text-secondary" />
                </div>
                <h3 className="font-heading text-3xl font-black text-white mb-3 uppercase italic">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-lg font-light">Thank you. Our stylists will review your inquiry and respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-heading text-3xl font-black text-white mb-8 uppercase italic">Book a Styling</h3>
                <div className="grid grid-cols-1 gap-6">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.toUpperCase()}
                      value={form[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required={field !== 'phone'}
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 text-xs font-bold tracking-[0.2em] outline-none transition-all focus:border-secondary focus:bg-white/10"
                    />
                  ))}
                  <textarea rows={4} placeholder="YOUR MESSAGE"
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 text-xs font-bold tracking-[0.2em] outline-none resize-none transition-all focus:border-secondary focus:bg-white/10"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-secondary text-primary py-5 font-black text-sm tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-60 flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send Inquiry <ArrowRight size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="text-left">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-10 leading-none uppercase italic">
            Visit Our <br /> <span className="text-secondary">Boutique</span>
          </h2>
          <div className="space-y-8 max-w-sm">
            <div className="flex gap-6 items-start">
              <MapPin className="text-secondary mt-1 shrink-0" size={24} />
              <div>
                <p className="text-white font-bold tracking-widest uppercase text-xs mb-2">Location</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <Phone className="text-secondary mt-1 shrink-0" size={24} />
              <div>
                <p className="text-white font-bold tracking-widest uppercase text-xs mb-2">WhatsApp</p>
                <p className="text-white/50 text-sm leading-relaxed">+234 706 120 0116</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <Instagram className="text-secondary mt-1 shrink-0" size={24} />
              <div>
                <p className="text-white font-bold tracking-widest uppercase text-xs mb-2">Instagram</p>
                <p className="text-white/50 text-sm leading-relaxed">@shantel_fashion_world</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-28 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-8 group w-fit">
              <div className="w-12 h-12 bg-secondary flex items-center justify-center font-heading font-black text-primary text-2xl">S</div>
              <span className="font-heading font-black text-white text-3xl tracking-tighter uppercase italic">Shantel Fashion</span>
            </a>
            <p className="text-white/40 max-w-md text-lg leading-relaxed mb-8">
              Sharp delivery, nationwide. Defining the intersection of street aesthetics and luxury curation for the modern Abuja icon.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/shantel_fashion_world" className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/2347061200116" className="w-12 h-12 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-8">Quick Links</p>
            <div className="flex flex-col gap-4">
              {['Home', 'Collection', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-8">Visit Us</p>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Shop B308, Soar Plaza<br />Gwarimpa, Abuja
            </p>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
              Mon — Sat: 10AM — 7PM
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <p className="text-white/20 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Shantel Fashion World. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-[10px] tracking-widest uppercase hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="text-white/20 text-[10px] tracking-widest uppercase hover:text-secondary transition-colors">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <SectionDivider />
      <Features />
      <Products />
      <SectionDivider />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}