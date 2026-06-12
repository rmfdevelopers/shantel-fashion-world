'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  Crown, 
  Truck, 
  Award, 
  ImageOff, 
  CheckCheck, 
  Loader2,
  TrendingUp,
  ShieldCheck,
  Users
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-RULE
// Typography Personality: oversized

const brief = {
  brand: {
    name: "Shantel Fashion World",
    tagline: "The Pinnacle of Abuja's Luxury Street-Luxe",
    description: "Exquisite designer bags, footwear, and trending apparel curated for the modern connoisseur. We bridge the gap between high-fashion editorial and affordable luxury.",
    industry: "fashion",
    region: "nigeria",
    currency: "₦"
  },
  colors: {
    primary: "#111111",
    secondary: "#D4AF37",
    accent: "#F9F9F9"
  },
  contact: {
    whatsapp: "2347061200116",
    instagram: "shantel_fashion_world",
    email: "",
    address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1630041263622-ca8001e82883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1728488447895-0f0d82299f16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1728488448101-fb760f074304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1728488447889-13f95adcf5a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1683640862718-c001169c8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1728488448472-16a259c6ba7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1740198827586-e5ef808141a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1758789872879-1be800c7bbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ]
};

// Custom Hooks
const useScrollReveal = (threshold = 0.1) => {
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
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    <span className="text-secondary font-sans text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      Est. 2024
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
  </div>
);

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center text-primary font-black text-xl italic group-hover:scale-105 transition-transform">S</div>
            <span className="font-heading text-xl font-bold tracking-tighter uppercase hidden sm:block">Shantel Fashion</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Collection', 'Our Story', 'Boutique', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-secondary text-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all rounded-sm"
            >
              Get Started
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-black italic">S.F.W</span>
            <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Collection', 'Our Story', 'Boutique', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileMenu(false)}
                className="text-4xl font-heading font-black tracking-tight"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-8 border-t border-white/10">
            <p className="text-secondary font-bold mb-4 uppercase text-xs tracking-widest">Connect</p>
            <div className="flex gap-6">
              <Instagram size={24} className="opacity-50" />
              <Phone size={24} className="opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Variant HR-A (Centered Editorial) */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent)] px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 grayscale mix-blend-overlay pointer-events-none">
          <SafeImage src={IMAGES.hero} alt="Atmosphere" fill className="object-cover" priority />
        </div>
        <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-6xl">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase italic animate-fadeIn">
            Elegance <span className="text-stroke">Redefined</span>
          </h1>
          <p className="text-white/50 mt-10 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed animate-slideUp">
            {brief.brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12 animate-slideUp" style={{ animationDelay: '300ms' }}>
            <a href="#collection" className="bg-secondary text-primary px-12 py-5 font-black text-sm uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
              Shop Collection
            </a>
            <a href="#boutique" className="border border-white/20 text-white px-12 py-5 font-bold text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
              The Boutique
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* Features - Variant F-NUMBERED (Editorial) */}
      <section id="features" className="py-28 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none uppercase">The Shantel <br /><span className="text-secondary">Standard</span></h2>
          </div>
          <div className="divide-y divide-white/10">
            {[
              { icon: Crown, title: "Curated Selection", desc: "Every piece is handpicked to ensure it meets the highest standards of trending luxury." },
              { icon: Truck, title: "Nationwide Concierge", desc: "Sharp delivery, nationwide. Swift and secure delivery from our Abuja boutique to your doorstep." },
              { icon: Award, title: "Style Advisory", desc: "Expert fashion consulting to help you build a wardrobe that radiates confidence." }
            ].map((f, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref} className={`py-12 flex flex-col md:flex-row items-start gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                  <span className="font-heading text-secondary/30 text-5xl font-black italic shrink-0 w-20">0{i+1}</span>
                  <div className="flex-1">
                    <h3 className="font-heading text-3xl font-bold text-white mb-4 uppercase">{f.title}</h3>
                    <p className="text-white/40 text-lg leading-relaxed max-w-xl">{f.desc}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-secondary transition-colors">
                    <f.icon className="text-secondary/60" size={24} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products - Variant P-HORIZONTAL (Scroll) with Clip Reveal Reveal */}
      <section id="collection" className="py-28 bg-zinc-900/40 relative overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-16 flex justify-between items-end">
          <div>
            <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-4">New Arrivals</p>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white uppercase">Trending Now</h2>
          </div>
          <div className="hidden md:flex gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30">←</div>
            <div className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary">→</div>
          </div>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 px-6 scrollbar-hide snap-x snap-mandatory">
          {[
            { name: "Luxe Calfskin Tote", price: "₦350,000", desc: "Premium leather handbag with gold-tone hardware." },
            { name: "Crystal Stilettos", price: "₦125,000", desc: "High-octane glamour featuring precision-cut crystals." },
            { name: "Designer Blazer", price: "₦45,000", desc: "Tailored masterpiece with structured shoulders." },
            { name: "Signature Clutch", price: "₦65,000", desc: "Detachable heavy-duty gold chain strap." }
          ].map((p, i) => {
            const { ref, isVisible } = useScrollReveal();
            return (
              <div key={i} ref={ref} className={`snap-start shrink-0 w-[320px] md:w-[400px] group transition-all duration-1000 ease-out ${isVisible ? 'max-w-[400px] opacity-100' : 'max-w-0 opacity-0'} overflow-hidden`}>
                <div className="relative aspect-[4/5] bg-zinc-800 mb-6 overflow-hidden">
                  <SafeImage src={IMAGES.products[i] || IMAGES.hero} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 right-4 bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-white">Sold Out</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <button className="w-full bg-secondary text-primary py-4 text-xs font-black uppercase tracking-widest">Enquire Now</button>
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold text-white uppercase">{p.name}</h3>
                <p className="text-secondary font-black text-lg mt-1">{p.price}</p>
                <p className="text-white/30 text-sm mt-2 line-clamp-1">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery - Masonry (Inside Boutique) */}
      <section id="boutique" className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl font-black text-white mb-6 uppercase tracking-tighter">The Boutique</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">A glimpse into our Gwarimpa showroom. Where luxury finds its home in Abuja.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((img, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref} className={`break-inside-avoid relative group rounded-sm overflow-hidden bg-zinc-900 transition-all duration-700 ${isVisible ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  <SafeImage src={img} alt="Showroom" width={600} height={800} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 border-[20px] border-secondary/0 group-hover:border-secondary/10 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section - Split + Stats */}
      <section id="our-story" className="py-28 px-6 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] relative z-10 overflow-hidden shadow-[40px_40px_0px_rgba(212,175,55,0.05)]">
               <SafeImage src={IMAGES.hero} alt="Founder" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 border-2 border-secondary/20 -z-0" />
          </div>
          <div>
            <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-4">Our Heritage</p>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-[0.9] uppercase mb-8">Global Style, <br /><span className="text-stroke">Local Soul</span></h2>
            <p className="text-white/50 text-xl leading-relaxed mb-12">
              Located in the heart of Abuja, Shantel Fashion World began with a single mission: to make premium global fashion accessible to the Nigerian market without compromising on the boutique experience.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Style Followers", num: "3,000+", icon: Users },
                { label: "Authentic Pieces", num: "500+", icon: ShieldCheck }
              ].map((s, i) => (
                <div key={i} className="group">
                   <s.icon className="text-secondary mb-4 group-hover:scale-110 transition-transform" />
                   <p className="font-heading text-4xl font-black text-white">{s.num}</p>
                   <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Masonry Spotlights */}
      <section className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-black text-white text-center mb-20 uppercase tracking-tighter">Voices of Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Nneka Opara", text: "The quality of the bags I bought exceeded my expectations. Shantel is my go-to for luxury in Abuja.", role: "Loyal Customer" },
              { name: "Tunde Bakare", text: "Incredible service and very fast delivery to Lagos. The shoes fit perfectly.", role: "Fashion Enthusiast" },
              { name: "Fatima Yusuf", text: "The gold accents on the boutique interior match the quality of the clothes. Truly a premium experience.", role: "Influencer" }
            ].map((t, i) => {
              const { ref, isVisible } = useScrollReveal();
              return (
                <div key={i} ref={ref} className={`p-10 bg-zinc-900/50 border border-white/5 rounded-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="flex gap-1 mb-8">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-1 h-1 rounded-full bg-secondary" />)}
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                    <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center text-secondary font-heading text-2xl font-black">{t.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-white text-sm uppercase tracking-widest">{t.name}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact - Variant C4 (Full Bleed Accent) */}
      <section id="contact" className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-[10vw] md:text-[6vw] font-black text-primary leading-none mb-12 uppercase italic">
              Visit The <br />Showroom
            </h2>
            <div className="space-y-8 border-l-[6px] border-primary/20 pl-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" />
                <p className="text-primary font-bold text-lg max-w-sm">{brief.contact.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary" />
                <p className="text-primary font-black text-2xl">+{brief.contact.whatsapp}</p>
              </div>
              <div className="flex items-center gap-4 group">
                <Instagram className="text-primary" />
                <p className="text-primary font-black text-xl group-hover:underline cursor-pointer">@shantel_fashion_world</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ContactForm />
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-primary border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="w-12 h-12 bg-secondary flex items-center justify-center text-primary font-black text-2xl italic mb-8">S</div>
              <h3 className="font-heading text-4xl font-black text-white mb-6 uppercase tracking-tighter">Shantel Fashion World</h3>
              <p className="text-white/30 max-w-sm text-sm leading-relaxed mb-8">
                The ultimate destination for luxury street-luxe in Abuja. Redefining style, one iconic piece at a time.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"><Instagram size={18} /></div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"><Phone size={18} /></div>
              </div>
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-widest mb-8">Navigation</p>
              <ul className="space-y-4">
                {['Home', 'Collection', 'Our Story', 'Visit Showroom'].map(i => (
                  <li key={i}><a href="#" className="text-white/40 text-sm hover:text-secondary transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-black text-sm uppercase tracking-widest mb-8">Boutique</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Soar Plaza, Gwarimpa<br />
                Shop B308 1st Avenue<br />
                Abuja, Nigeria
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
            <p className="text-white/20 text-xs tracking-widest uppercase">&copy; {new Date().getFullYear()} Shantel Fashion World. All Rights Reserved.</p>
            <p className="text-white/20 text-[10px] tracking-widest uppercase">Nigeria's Premier Luxury Concierge</p>
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
      <div className="bg-primary p-12 text-center animate-scaleIn border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.05),transparent)]" />
        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-8 mx-auto border border-secondary/40">
          <CheckCheck size={40} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 uppercase italic">Sent Perfectly</h3>
        <p className="text-white/40 max-w-xs mx-auto text-lg">Our style concierge will be in touch shortly to assist you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-8 md:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-10 uppercase tracking-tighter italic">Book an Appointment</h3>
        <div className="space-y-5">
          {['name', 'email', 'phone'].map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required={field !== 'phone'}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              className="w-full bg-white/5 border-b border-white/10 py-5 text-white placeholder-white/30 text-sm outline-none focus:border-secondary transition-all"
            />
          ))}
          <textarea
            placeholder="What are you looking for?"
            rows={3}
            required
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            className="w-full bg-white/5 border-b border-white/10 py-5 text-white placeholder-white/30 text-sm outline-none focus:border-secondary transition-all resize-none"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full mt-12 bg-secondary text-primary py-5 font-black text-sm uppercase tracking-widest flex justify-center items-center gap-3 hover:brightness-110 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={18} /></>}
        </button>
      </div>
    </form>
  );
}