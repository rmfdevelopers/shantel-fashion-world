'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Gem, 
  Truck, 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  CheckCircle, 
  Instagram, 
  Phone, 
  MapPin, 
  Mail, 
  ArrowRight, 
  Loader2, 
  CheckCheck, 
  Menu, 
  X, 
  ImageOff,
  Star
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks ---

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

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#222] ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
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

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-7'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="group">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-black tracking-tighter text-white group-hover:text-secondary transition-colors uppercase">SHANTEL</span>
            <span className="text-[10px] tracking-[0.4em] font-bold text-secondary uppercase -mt-1">Fashion World</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Collection', 'Lookbook', 'About', 'Contact'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs uppercase tracking-widest font-medium text-white/70 hover:text-secondary transition-colors">
              {link}
            </a>
          ))}
          <a href="https://wa.me/2347061200116" className="bg-secondary text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-full hover:brightness-110 transition-all">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[60] transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-black text-white uppercase">SHANTEL</span>
            <button onClick={() => setIsOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Collection', 'Lookbook', 'About', 'Contact'].map((link) => (
              <a key={link} onClick={() => setIsOpen(false)} href={`#${link.toLowerCase()}`} className="text-4xl font-heading font-black text-white hover:text-secondary transition-colors italic">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <a href="https://wa.me/2347061200116" className="w-full bg-secondary text-black py-5 text-center font-black uppercase tracking-widest flex items-center justify-center gap-3">
              Order Now <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ brand, hero }: { brand: any, hero: any }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="home" ref={ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] via-[#141414] to-[#1a1300] px-6 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.07] max-w-5xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-3 transition-all duration-[2s] ${isVisible ? 'scale-105 rotate-2' : 'scale-100 rotate-6'}`}>
        <SafeImage src={hero.image_url} alt={brand.name} fill className="object-cover" priority />
      </div>

      <div className="relative z-10 text-center max-w-5xl">
        <h1 className={`font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {hero.headline.split(' ').map((word: string, i: number) => (
            <span key={i} className="block">{word}</span>
          ))}
        </h1>
        <p className={`text-white/50 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {hero.subtext}
        </p>
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-14 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#collection" className="bg-secondary text-black px-12 py-5 font-black text-sm uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            {hero.cta_text}
          </a>
          <a href="#about" className="border border-white/20 text-white px-12 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-sm">
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = ({ section, features }: { section: any, features: any[] }) => {
  const { ref, isVisible } = useScrollReveal();
  const icons = [<Gem key="1" />, <Truck key="2" />, <ShieldCheck key="3" />];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">Why Shantel</p>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-6 leading-none">
            {section.title}
          </h2>
          <p className="text-white/40 text-lg max-w-xl">{section.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`bg-white/5 rounded-[2rem] p-10 border border-white/5 hover:border-secondary/30 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-secondary/10 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-black transition-all duration-500">
                {icons[i] || <Star />}
              </div>
              <h3 className="font-heading text-3xl font-black text-white mb-4 italic">{f.title}</h3>
              <p className="text-white/50 leading-relaxed text-lg">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Products = ({ section, products }: { section: any, products: any[] }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="collection" ref={ref} className="py-28 px-6 bg-[#0F0F0F] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">The Selection</p>
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none">{section.title}</h2>
          </div>
          <p className="text-white/40 text-lg md:text-right max-w-xs">{section.subtitle}</p>
        </div>

        <div className="space-y-32">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/5">
                  <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-2/3 h-2/3 bg-secondary/5 rounded-[3rem] -z-10 blur-3xl`} />
              </div>
              
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-secondary text-sm font-bold tracking-[0.4em] uppercase mb-6 block">Featured Item 0{i+1}</span>
                <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-[0.9] italic mb-6">{p.name}</h3>
                <p className="text-white/45 text-xl leading-relaxed mb-10 max-w-lg">{p.description}</p>
                <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'} gap-6`}>
                  <span className="text-4xl font-black text-white tracking-tighter">{p.price}</span>
                  <a href="https://wa.me/2347061200116" className="bg-secondary text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:brightness-110 hover:translate-y-[-2px] transition-all">
                    Order Piece
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

const DividerStat = ({ brand }: { brand: any }) => {
  return (
    <div className="bg-secondary py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {[
          { number: '3k+', label: 'Fashion Followers' },
          { number: '500+', label: 'Designer Pieces' },
          { number: '100%', label: 'Authenticity' }
        ].map((s, i) => (
          <div key={i} className="px-8 py-8 md:py-4">
            <p className="text-6xl font-black text-black tracking-tighter">{s.number}</p>
            <p className="text-black/60 text-sm mt-2 font-black uppercase tracking-[0.3em]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = ({ section, images }: { section: any, images: any[] }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="lookbook" ref={ref} className="py-28 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">The Aesthetic</p>
          <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none mb-6 italic">{section.title}</h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">{section.subtitle}</p>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <SafeImage 
                src={img.url} 
                alt={`Lookbook ${i}`} 
                width={600} 
                height={800} 
                className="w-full h-auto object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white scale-75 group-hover:scale-100 transition-transform duration-500" size={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = ({ section, brand }: { section: any, brand: any }) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" ref={ref} className="min-h-screen grid md:grid-cols-2 items-stretch bg-[#0F0F0F] overflow-hidden">
      <div className={`flex flex-col justify-center px-8 md:px-20 py-24 order-2 md:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
        <p className="text-secondary font-mono text-xs tracking-[0.4em] uppercase mb-8 font-bold">The Heritage</p>
        <h2 className="font-heading text-5xl md:text-[5.5rem] font-black text-white leading-[0.85] mb-10 italic">{section.title}</h2>
        <p className="text-white/45 text-xl leading-relaxed max-w-xl mb-12">{section.description}</p>
        
        <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-10">
          {section.stats.map((s: any, i: number) => (
            <div key={i}>
              <p className="font-heading text-5xl font-black text-white tracking-tighter">{s.number}</p>
              <p className="text-secondary text-xs uppercase tracking-[0.3em] mt-3 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`relative min-h-[50vh] md:min-h-full order-1 md:order-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
        <SafeImage src="https://images.unsplash.com/photo-1746455783868-c8049bdb8f3a?q=80&w=1080" alt="Boutique Interior" fill className="object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        <div className="absolute bottom-10 left-10 p-8 backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] max-w-xs hidden md:block">
          <p className="text-white text-sm italic leading-relaxed">"Luxury is not a luxury, it's a standard of living. Welcome to the world of Shantel."</p>
          <p className="text-secondary font-black text-[10px] uppercase tracking-widest mt-4">Abuja Boutique Hub</p>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ section }: { section: any }) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section ref={ref} className="py-28 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <p className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4">Society Says</p>
        <h2 className="font-heading text-6xl md:text-7xl font-black text-white leading-none italic">{section.title}</h2>
      </div>
      
      <div className="w-full overflow-hidden">
        <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused]">
          {[...(section.items ?? []), ...(section.items ?? [])].map((t, i) => (
            <div key={i} className="w-80 md:w-[450px] shrink-0 bg-white/5 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <Star key={n} size={14} className="fill-secondary text-secondary" />)}
              </div>
              <p className="text-white/70 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary font-black text-xl border border-secondary/25">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t.name}</p>
                  <p className="text-secondary text-xs uppercase tracking-widest font-black mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ section, brand, contact }: { section: any, brand: any, contact: any }) => {
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
    <section id="contact" ref={ref} className="py-32 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-heading text-[10vw] md:text-[7vw] font-black text-black leading-none mb-12 tracking-tighter">
            {section.title}
          </h2>
          <div className="space-y-8 border-l-4 border-black/10 pl-8">
            <div className="group cursor-pointer">
              <p className="text-black/40 text-xs font-black uppercase tracking-widest mb-1">WhatsApp Us</p>
              <p className="text-black text-2xl font-black">{contact.whatsapp}</p>
            </div>
            <div className="group cursor-pointer">
              <p className="text-black/40 text-xs font-black uppercase tracking-widest mb-1">Follow Us</p>
              <p className="text-black text-2xl font-black">{contact.instagram}</p>
            </div>
            <div className="group">
              <p className="text-black/40 text-xs font-black uppercase tracking-widest mb-1">Our Showroom</p>
              <p className="text-black text-lg font-bold max-w-xs">{contact.address}</p>
            </div>
          </div>
        </div>
        
        <div className={`w-full relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {sent ? (
            <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-[#0d0d0d] rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-50" />
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 relative z-10">
                <CheckCheck size={40} className="text-secondary" />
              </div>
              <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10 italic">Inquiry Received</h3>
              <p className="text-white/50 text-xl relative z-10">Sharp delivery, nationwide. Our team will reach out shortly to finalize your order.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-[#0d0d0d] p-10 sm:p-14 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <h3 className="font-heading text-3xl font-black text-white mb-10 italic">Send an Inquiry</h3>
                <div className="space-y-5">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <div key={field} className="relative group">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                      />
                    </div>
                  ))}
                  <div className="relative group">
                    <textarea 
                      rows={4} 
                      placeholder="Your order details or question"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-10 bg-secondary text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="animate-spin" size={20} /> Processing...
                    </span>
                  ) : (
                    <>
                      Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ brand, contact }: { brand: any, contact: any }) => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex flex-col mb-8">
              <span className="font-heading text-4xl font-black tracking-tighter text-white uppercase">SHANTEL</span>
              <span className="text-[12px] tracking-[0.5em] font-black text-secondary uppercase -mt-1">Fashion World</span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-10">
              {brand.description}
            </p>
            <div className="flex gap-6">
              {contact.instagram && (
                <a href={`https://instagram.com/${contact.instagram.replace('@','')}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-secondary hover:text-secondary transition-all">
                  <Instagram size={20} />
                </a>
              )}
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-secondary hover:text-secondary transition-all">
                  <Phone size={20} />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Collection', 'Lookbook', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-secondary transition-colors text-sm uppercase tracking-widest font-bold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Location</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {contact.address}
            </p>
            <div className="flex items-center gap-3 text-secondary text-xs font-black uppercase tracking-widest">
              <MapPin size={16} /> Open Mon - Sat
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {brand.name}. Abuja's Pride.
          </p>
          <div className="flex gap-8">
            <span className="text-white/10 text-[10px] font-black uppercase tracking-widest">Privacy Policy</span>
            <span className="text-white/10 text-[10px] font-black uppercase tracking-widest">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Page() {
  const brief = {
    "brand": {
      "name": "Shantel Fashion World",
      "tagline": "Where Luxury Meets the Streets",
      "description": "Abuja's premier destination for curated designer bags, trending footwear, and high-fashion apparel that defines elegance without compromise.",
      "industry": "fashion"
    },
    "hero": {
      "headline": "Redefine Your Style Signature",
      "subtext": "Step into a world of curated luxury. From designer bags to trending apparel, we bring the global runway to Abuja.",
      "cta_text": "View Collection",
      "image_url": "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?q=80&w=1080"
    },
    "features": {
      "title": "The Shantel Standard",
      "subtitle": "Why Abuja's elite choose our boutique for their fashion needs.",
      "items": [
        { "title": "Curated Selection", "description": "Hand-picked designer pieces that stay ahead of the global fashion curve." },
        { "title": "Nationwide Delivery", "description": "Swift and secure dispatch from our Gwarimpa hub to your doorstep." },
        { "title": "Guaranteed Quality", "description": "Every item in our boutique is vetted for premium craftsmanship." }
      ]
    },
    "products": [
      { "name": "Signature Designer Handbag", "description": "Premium leather craftsmanship with gold-toned hardware for the modern woman.", "price": "₦155,000", "image_url": "https://images.unsplash.com/photo-1632905351666-9b11f8a64ee3?q=80&w=1080" },
      { "name": "Stiletto Statement Heels", "description": "High-octane glamour featuring a sleek silhouette and comfortable inner lining.", "price": "₦48,500", "image_url": "https://images.unsplash.com/photo-1629737168267-a9cc18033938?q=80&w=1080" },
      { "name": "Floral Editorial Midi", "description": "Flowing silhouette with vibrant prints, perfect for high-society events.", "price": "₦32,000", "image_url": "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?q=80&w=1080" },
      { "name": "Premium Suede Loafers", "description": "Sophisticated men's footwear designed for both comfort and executive presence.", "price": "₦75,000", "image_url": "https://images.unsplash.com/photo-1647412983566-1957e341807c?q=80&w=1080" }
    ],
    "about": {
      "title": "The Boutique Story",
      "description": "Located in the heart of Gwarimpa, Shantel Fashion World was founded on the belief that luxury should be accessible yet exclusive. We bridge the gap between trending designer aesthetics and everyday elegance.",
      "stats": [
        { "number": "3k+", "label": "Fashion Followers" },
        { "number": "500+", "label": "Designer Pieces" }
      ]
    },
    "gallery": {
      "title": "The Lookbook",
      "subtitle": "Visual inspiration from our latest seasonal drops.",
      "images": [
        { "url": "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?q=80&w=1080" },
        { "url": "https://images.unsplash.com/photo-1632905351666-9b11f8a64ee3?q=80&w=1080" },
        { "url": "https://images.unsplash.com/photo-1629737168267-a9cc18033938?q=80&w=1080" },
        { "url": "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?q=80&w=1080" },
        { "url": "https://images.unsplash.com/photo-1647412983566-1957e341807c?q=80&w=1080" },
        { "url": "https://images.unsplash.com/photo-1746455783868-c8049bdb8f3a?q=80&w=1080" }
      ]
    },
    "testimonials": {
      "title": "Voices of Style",
      "items": [
        { "name": "Amina Bello", "text": "The best place in Abuja for bags! The quality of the leather is exactly as described.", "role": "Loyal Customer" },
        { "name": "Chika Okoro", "text": "Found my wedding guest outfit here. Everyone asked where I got it. Highly recommend!", "role": "Fashion Influencer" },
        { "name": "Ibrahim Suleiman", "text": "Great service and even better shoes. The loafers fit perfectly.", "role": "Business Executive" }
      ]
    },
    "contact": {
      "whatsapp": "2347061200116",
      "instagram": "@shantel_fashion_world",
      "address": "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
    }
  };

  return (
    <main className="bg-primary">
      <Navbar />
      <Hero brand={brief.brand} hero={brief.hero} />
      <Features section={brief.features} features={brief.features.items} />
      <DividerStat brand={brief.brand} />
      <Products section={{ title: "The Showcase", subtitle: "Trending arrivals and timeless designer classics." }} products={brief.products} />
      <Gallery section={brief.gallery} images={brief.gallery.images} />
      <About section={brief.about} brand={brief.brand} />
      <Testimonials section={brief.testimonials} />
      <Contact section={{ title: "Visit the Showroom" }} brand={brief.brand} contact={brief.contact} />
      <Footer brand={brief.brand} contact={brief.contact} />
    </main>
  );
}