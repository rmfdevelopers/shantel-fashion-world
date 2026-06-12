'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Diamond, 
  Users, 
  Award, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  ArrowRight, 
  Menu, 
  X, 
  Loader2, 
  CheckCheck, 
  ImageOff 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: oversized

const brief = {
  brand: {
    name: "Shantel Fashion World",
    tagline: "Redefining Elegance for the Modern Silhouette",
    description: "Abuja's premier destination for curated luxury bags, designer footwear, and trending apparel for the fashion-forward individual.",
    industry: "fashion",
    region: "nigeria",
    currency: "₦"
  },
  colors: {
    primary: "#0F0F0F",
    secondary: "#D4AF37",
    accent: "#F5F5F5"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1603545078901-3b93beb4d898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZW5kJTIwbHV4dXJ5JTIwZmFzaGlvbiUyMG1vZGVsJTIwZWRpdG9yaWFsJTIwYmxhY2slMjBhbmQlMjBnb2xkJTIwb3V0Zml0fGVufDF8MHx8fDE3ODEyNTYyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Luxury editorial model in black and gold"
  },
  products: [
    { name: "Designer Quilted Handbag", price: "₦250,000", description: "Premium leather craftsmanship with signature gold-tone hardware.", url: "https://images.unsplash.com/photo-1779406273620-90650f8e1ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBxdWlsdGVkJTIwbGVhdGhlciUyMGhhbmRiYWclMjBoaWdoJTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMGJsYWNrJTIwZ29sZHxlbnwxfDB8fHwxNzgxMjU2MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Stiletto Statement Heels", price: "₦85,000", description: "Elegant pointed-toe heels designed for ultimate comfort and presence.", url: "https://images.unsplash.com/photo-1777322615136-2f1d5d636cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMHN0aWxldHRvJTIwc2hvZXMlMjBnb2xkJTIwYWNjZW50cyUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8MHx8fDE3ODEyNTYyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Chic Two-Piece Ensemble", price: "₦120,000", description: "A trending designer set that transitions perfectly from day to night.", url: "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxjaGljJTIwZGVzaWduZXIlMjB3b21lbiUyN3MlMjBzdWl0JTIwZWRpdG9yaWFsJTIwcG9zZSUyMGx1eHVyeXxlbnwxfDB8fHwxNzgxMjU2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { name: "Gold Buckle Signature Belt", price: "₦45,000", description: "The perfect accessory to elevate any outfit with a touch of luxury.", url: "https://images.unsplash.com/photo-1585856331452-87ea5a04c21c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBnb2xkJTIwYnVja2xlJTIwYmVsdCUyMGRldGFpbHxlbnwxfDB8fHwxNzgxMjU2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080" }
  ],
  galleryImages: [
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
    "https://images.unsplash.com/photo-1536524894612-c69d62c6f639",
    "https://images.unsplash.com/photo-1639246928034-083c18eabd82",
    "https://images.unsplash.com/photo-1659576650819-a2edad0dd3df"
  ]
};

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

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-secondary/20 to-primary ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-secondary/40" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 1080) : undefined}
      height={!fill ? (height ?? 1080) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

function SectionDivider({ tagline }: { tagline: string }) {
  return (
    <div className="py-24 flex items-center gap-8 px-8 max-w-7xl mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      <span className="text-secondary font-heading italic text-lg md:text-2xl tracking-widest whitespace-nowrap opacity-70">
        {tagline}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Animation Refs ---
  const heroReveal = useScrollReveal(0.05);
  const featuresReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.1);
  const galleryReveal = useScrollReveal(0.1);
  const aboutReveal = useScrollReveal(0.1);
  const statsReveal = useScrollReveal(0.2);
  const testimonialReveal = useScrollReveal(0.1);
  const contactReveal = useScrollReveal(0.1);

  // --- Contact Form Logic ---
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative bg-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-5 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-secondary/10 shadow-xl py-4' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-white">SHANTEL</span>
            <span className="text-secondary text-[0.6rem] tracking-[0.3em] uppercase -mt-1 font-bold">Fashion World</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collection', 'About', 'Visit Us'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} 
                className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-8 py-2.5 text-xs uppercase font-black tracking-widest hover:brightness-110 transition-all rounded-full">
              Shop Collection
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-primary transition-transform duration-500 transform ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-2xl font-bold text-white">SHANTEL</span>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Collection', 'About', 'Visit Us'].map((link) => (
              <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase().replace(' ', '')}`} 
                className="text-4xl font-heading text-white hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto">
            <a href="#contact" onClick={() => setMobileMenu(false)} className="block w-full bg-secondary text-primary text-center py-5 font-black uppercase tracking-widest">
              Shop Collection
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-A Pattern) */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-primary px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[140px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '2s' }} />
        
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-15 max-w-5xl max-h-[70vh] rounded-[5rem] overflow-hidden rotate-2 transition-all duration-1000 ${heroReveal.isVisible ? 'scale-100' : 'scale-110'}`}>
          <SafeImage src={brief.heroImage.url} alt="Hero Banner" fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            Curated Luxury, <br/> 
            <span className="text-secondary">Defined by You.</span>
          </h1>
          <p className="text-white/50 mt-10 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Step into a world of exclusive designer bags, shoes, and trending apparel in the heart of Gwarimpa.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-14">
            <a href="#products" className="bg-secondary text-primary px-12 py-5 font-black text-sm uppercase tracking-widest
              hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              Shop the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-12 py-5 font-bold text-sm uppercase tracking-widest
              hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-sm">
              Discover More
            </a>
          </div>
        </div>
      </section>

      <SectionDivider tagline="Sharp delivery, nationwide." />

      {/* Features Section (F-BENTO Asymmetric) */}
      <section id="experience" ref={featuresReveal.ref} className="py-28 px-6 bg-primary/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">The Shantel <span className="text-secondary">Experience</span></h2>
            <p className="text-white/40 mt-4 text-xl font-light">Why our clients choose us for their luxury needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-gradient-to-br from-secondary/20 to-transparent rounded-[3rem] p-12 border border-secondary/20
              hover:border-secondary/40 transition-all duration-700 flex flex-col justify-between group min-h-[400px]
              ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Truck size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-5xl font-black text-white uppercase italic">Nationwide Delivery</h3>
                <p className="text-white/60 mt-4 text-lg max-w-md">Swift and secure shipping from Abuja to your doorstep across Nigeria. Professional handling for every luxury piece.</p>
              </div>
            </div>

            <div className={`space-y-6 flex flex-col ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              {[
                { title: 'Curated Selection', icon: Diamond, desc: 'Every piece is handpicked for quality.' },
                { title: 'Personal Styling', icon: Users, desc: 'Expert advice for your curated wardrobe.' },
                { title: 'Authentic Quality', icon: ShieldCheck, desc: 'Trending designer pieces with durability.' }
              ].map((f, i) => (
                <div key={i} className="flex-1 bg-white/5 rounded-[2.5rem] p-8 border border-white/5
                  hover:bg-white/10 hover:border-white/15 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    <f.icon size={20} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">{f.title}</h3>
                  <p className="text-white/40 text-sm mt-2">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section (P-EDITORIAL Hover Reveal) */}
      <section id="collection" ref={productsReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-heading text-6xl md:text-[6rem] font-black text-white mb-24 uppercase italic leading-none">
            The Boutique <span className="text-secondary">Showcase</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brief.products.map((p, i) => (
              <div key={i} className={`group relative h-[500px] md:h-[650px] rounded-[3.5rem] overflow-hidden transition-all duration-1000 ease-out
                ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-110 transition-all duration-1000 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-12 relative z-10">
                  <div className="mb-4 overflow-hidden">
                    <span className="inline-block text-secondary font-bold text-xs tracking-[0.4em] uppercase mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      Trending Now
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-white leading-none uppercase">{p.name}</h3>
                  <div className="overflow-hidden transition-all duration-700 max-h-0 group-hover:max-h-32">
                    <p className="text-white/60 mt-4 text-lg font-light leading-relaxed max-w-sm">{p.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <span className="text-secondary font-heading italic text-3xl">{p.price}</span>
                    <a href="#contact" className="bg-white text-primary px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest
                      hover:bg-secondary transition-all hover:scale-105">Inquire</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section (Masonry) */}
      <section id="gallery" ref={galleryReveal.ref} className="py-28 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase italic">In-Store <span className="text-secondary">Elegance</span></h2>
            <p className="text-white/40 mt-4 text-xl">A glimpse inside our Gwarimpa showroom.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {brief.galleryImages.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-[2.5rem] overflow-hidden transition-all duration-1000
                ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Gallery ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (V3 Split) */}
      <section id="about" ref={aboutReveal.ref} className="py-28 grid md:grid-cols-2 items-stretch bg-primary overflow-hidden min-h-[80vh]">
        <div className={`relative min-h-[400px] md:min-h-full transition-all duration-1000 ${aboutReveal.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
          <SafeImage src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04" alt="Boutique Interior" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent" />
          <div className="absolute inset-0 bg-primary/20" />
        </div>
        <div className={`flex flex-col justify-center px-8 md:px-24 py-20 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
          <span className="text-secondary font-bold tracking-[0.5em] uppercase text-xs mb-6">Our Legacy</span>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase italic mb-8">
            A Legacy <br/> <span className="text-secondary">of Style</span>
          </h2>
          <p className="text-white/50 text-xl leading-relaxed max-w-lg font-light mb-12">
            Based in the vibrant heart of Abuja, Shantel Fashion World has become a beacon for those who refuse to compromise on quality. We bridge the gap between trending designer aesthetics and accessible luxury.
          </p>
          
          <div ref={statsReveal.ref} className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { num: '3k+', label: 'Followers' },
              { num: '100%', label: 'Authentic' },
              { num: '5yr', label: 'Excellence' }
            ].map((s, i) => (
              <div key={i} className={`transition-all duration-1000 ${statsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <p className="font-heading text-4xl font-black text-secondary">{s.num}</p>
                <p className="text-white/30 text-[0.65rem] uppercase tracking-widest mt-1 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (T-SLIDER Auto-scroll) */}
      <section ref={testimonialReveal.ref} className="py-28 bg-white/3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white uppercase italic">Voices <span className="text-secondary">of Style</span></h2>
        </div>
        <div className="w-full overflow-hidden flex">
          <div className="flex w-[200%] gap-8 animate-slide-left hover:[animation-play-state:paused]">
            {[
              { name: "Amaka Nwachukwu", text: "The quality of the bags I bought is exceptional. Shantel Fashion World is my only stop in Abuja now.", role: "Loyal Customer" },
              { name: "Zainab Ahmed", text: "Found the perfect heels for my sister's wedding. The service at Soar Plaza is top-notch!", role: "Fashion Enthusiast" },
              { name: "Folake Adeniyi", text: "Fast delivery to Lagos and the packaging was so luxurious. Truly a premium experience.", role: "Verified Buyer" },
              { name: "Amaka Nwachukwu", text: "The quality of the bags I bought is exceptional. Shantel Fashion World is my only stop in Abuja now.", role: "Loyal Customer" },
              { name: "Zainab Ahmed", text: "Found the perfect heels for my sister's wedding. The service at Soar Plaza is top-notch!", role: "Fashion Enthusiast" },
              { name: "Folake Adeniyi", text: "Fast delivery to Lagos and the packaging was so luxurious. Truly a premium experience.", role: "Verified Buyer" }
            ].map((t, i) => (
              <div key={i} className="w-96 shrink-0 bg-primary/40 border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md">
                <div className="flex gap-1.5 mb-8">
                  {[1, 2, 3, 4, 5].map(n => <div key={n} className="w-2 h-2 rounded-full bg-secondary" />)}
                </div>
                <p className="text-white/80 text-xl font-light italic leading-relaxed mb-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-black font-heading text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-base uppercase tracking-tight">{t.name}</p>
                    <p className="text-secondary text-xs uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (C4 Full-bleed Secondary) */}
      <section id="visitus" ref={contactReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-700 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-[12vw] md:text-[7vw] font-black text-primary leading-[0.8] mb-12 uppercase italic">
              Visit Our <br/> Showroom
            </h2>
            <div className="space-y-8 border-l-4 border-primary/20 pl-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0 mt-1" />
                <p className="text-primary/80 text-xl font-bold max-w-sm">Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" />
                <p className="text-primary/80 text-xl font-bold">wa.me/c/2347061200116</p>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-primary shrink-0" />
                <p className="text-primary/80 text-xl font-bold">@shantel_fashion_world</p>
              </div>
            </div>
          </div>
          
          <div id="contact" className={`relative z-10 transition-all duration-700 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center bg-primary rounded-[3.5rem] border border-white/10 shadow-2xl animate-scaleIn">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40">
                  <CheckCheck size={40} className="text-secondary" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4 uppercase">Message Sent</h3>
                <p className="text-white/60 text-lg font-light">Thank you for reaching out. Our fashion consultants will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-primary p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl font-black text-white mb-10 uppercase italic">Inquire Online</h3>
                  <div className="space-y-5">
                    {[
                      { id: 'name', type: 'text', placeholder: 'Your Name' },
                      { id: 'email', type: 'email', placeholder: 'Email Address' },
                      { id: 'phone', type: 'text', placeholder: 'Phone Number' }
                    ].map(field => (
                      <input
                        key={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={(form as any)[field.id]}
                        onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none transition-all focus:border-secondary focus:bg-white/10"
                      />
                    ))}
                    <textarea 
                      rows={4} 
                      placeholder="Which designer pieces are you looking for?"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 outline-none resize-none transition-all focus:border-secondary focus:bg-white/10"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full mt-10 bg-secondary text-primary py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all flex justify-center items-center gap-3 disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={18} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex flex-col mb-8">
                <span className="font-heading text-4xl font-black tracking-tighter text-white">SHANTEL</span>
                <span className="text-secondary text-xs tracking-[0.4em] uppercase font-bold">Fashion World</span>
              </div>
              <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed mb-10">
                Redefining Elegance for the Modern Silhouette. Abuja&apos;s premier destination for curated luxury.
              </p>
              <div className="flex gap-4">
                {[Instagram, Mail, Phone].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-xl font-bold text-white uppercase tracking-widest mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Collection', 'About', 'Visit Us'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-white/40 hover:text-secondary transition-colors text-sm uppercase font-bold tracking-widest">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xl font-bold text-white uppercase tracking-widest mb-8">Showroom</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria
              </p>
              <p className="text-white/40 text-sm uppercase font-bold tracking-widest">Open: Mon - Sat (9am - 7pm)</p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs uppercase tracking-widest font-bold">
              &copy; {new Date().getFullYear()} Shantel Fashion World. Abuja, Nigeria.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/20 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/20 text-xs uppercase tracking-widest font-bold hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
// ===== END OF FILE =====