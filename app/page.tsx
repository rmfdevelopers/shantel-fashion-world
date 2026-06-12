'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ShoppingBag, 
  Instagram, 
  Phone, 
  MapPin, 
  Gem, 
  Truck, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Mail, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
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
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
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
      className={`${className} transition-opacity duration-700 ${error ? 'opacity-0' : 'opacity-100'}`} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Shantel Fashion World",
    tagline: "Elevating Abuja's Style with Affordable Luxury",
    description: "A curated collection of trending designer bags, shoes, and clothing for the modern fashion enthusiast in Abuja.",
    industry: "Fashion",
    region: "Nigeria",
    currency: "₦"
  };

  const contact = {
    whatsapp: "2347061200116",
    instagram: "shantel_fashion_world",
    email: "",
    address: "Soar plaza shop B308 1st Avenue Gwarimpa opposite FCMB bank, Abuja Nigeria"
  };

  const products = [
    { name: "Signature Designer Handbag", description: "Italian leather with gold-tone hardware and structured silhouette.", price: "₦120,000", image: "https://images.unsplash.com/photo-1652427019217-3ded1a356f10?q=80&w=1080" },
    { name: "Elite Stiletto Heels", description: "Sleek pointed-toe design with premium cushioning for comfort.", price: "₦85,000", image: "https://images.unsplash.com/photo-1780327007439-d78065bf157d?q=80&w=1080" },
    { name: "Silk Editorial Evening Gown", description: "Floor-length flowing silk available in trending seasonal colors.", price: "₦45,000", image: "https://images.unsplash.com/photo-1780679022323-7fa14400a8cd?q=80&w=1080" },
    { name: "Premium Men's Loafers", description: "Hand-stitched suede loafers for the sophisticated modern gentleman.", price: "₦150,000", image: "https://images.unsplash.com/photo-1676121270762-47c8d3a7b9d5?q=80&w=1080" }
  ];

  const features = [
    { title: "Curated Luxury", description: "Every piece is hand-selected to ensure it meets our elite standards.", icon: Gem },
    { title: "Abuja Delivery", description: "Swift and secure shipping across the capital and nationwide.", icon: Truck },
    { title: "Trend Setting", description: "Stay ahead of the fashion curve with our weekly new arrivals.", icon: TrendingUp }
  ];

  const stats = [
    { number: "3k+", label: "Style Followers" },
    { number: "500+", label: "Luxury Items" },
    { number: "100%", label: "Authenticity" }
  ];

  const testimonials = [
    { name: "Chioma Adeleke", role: "Lagos Entrepreneur", text: "The quality of the bags at Shantel is unmatched. I always get compliments!" },
    { name: "Ngozi Okafor", role: "Fashion Stylist", text: "My go-to spot in Gwarimpa for the latest shoes. Fast delivery too!" },
    { name: "Amaka Yusuf", role: "Loyal Customer", text: "Affordable luxury at its finest. The customer service is top-notch." }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1536524894612-c69d62c6f639?q=80",
    "https://images.unsplash.com/photo-1594994041677-15a66d7c5cea?q=80",
    "https://images.unsplash.com/photo-1594994043623-ef50cf163197?q=80",
    "https://images.unsplash.com/photo-1683640862718-c001169c8514?q=80",
    "https://images.unsplash.com/photo-1673801081941-12cb1fbb1f56?q=80",
    "https://images.unsplash.com/photo-1775135595254-48b0f9bbf34b?q=80"
  ];

  // --- Section Reveals ---
  const heroReveal = useScrollReveal(0.1);
  const featuresReveal = useScrollReveal(0.15);
  const galleryReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.1);
  const aboutReveal = useScrollReveal(0.15);
  const testimonialsReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  return (
    <div className="relative">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 border-b border-white/10 shadow-2xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg shadow-lg group-hover:rotate-12 transition-transform duration-300">
              <span className="text-primary font-black text-xl italic">SF</span>
            </div>
            <span className="text-xl font-heading font-black tracking-tighter hidden sm:block uppercase">Shantel World</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Products', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-xs uppercase tracking-[0.3em] font-bold text-white/60 hover:text-secondary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Shop Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar --- */}
      <div className={`fixed inset-0 z-[100] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 flex flex-col">
          <button className="self-end text-white/50 mb-12 hover:text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="space-y-8">
            {['Home', 'Products', 'About', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block text-3xl font-heading font-black text-white" onClick={() => setIsMenuOpen(false)}>
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/5">
            <p className="text-secondary font-bold mb-4">Visit Us</p>
            <p className="text-white/40 text-sm leading-relaxed">{contact.address}</p>
          </div>
        </div>
      </div>

      {/* --- Hero Section (HR-A) --- */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-secondary/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-15 max-w-4xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-2">
          <SafeImage src="https://images.unsplash.com/photo-1764181237984-70ac5f211b06?q=80" alt="Hero Fashion" fill className="object-cover" priority />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <h1 className={`font-heading text-6xl md:text-[7vw] font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Defining Elegance for the <br /><span className="text-gold-gradient italic">Modern Wardrobe</span>
          </h1>
          <p className={`text-white/50 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {brand.description}
          </p>
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mt-12 transition-all duration-1000 delay-500 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="#products" className="bg-secondary text-primary px-12 py-5 font-bold text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(197,160,89,0.3)]">
              Shop the Collection
            </a>
            <a href="#about" className="border border-white/20 text-white px-12 py-5 font-medium text-lg hover:bg-white/5 transition-all duration-300 rounded-full">
              Explore Story
            </a>
          </div>
        </div>
      </section>

      {/* --- Divider --- */}
      <div className="py-12 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <span className="text-secondary font-mono text-xs tracking-[0.5em] uppercase whitespace-nowrap opacity-70">
          Abuja&apos;s Best Boutique
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </div>

      {/* --- Features (F-BENTO) --- */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-4">Why Shop With Us</h2>
            <p className="text-white/40 text-lg uppercase tracking-widest">Sharp delivery, nationwide boutique service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`md:col-span-2 bg-zinc-900 rounded-[2.5rem] p-12 border border-white/5 hover:border-secondary/30 transition-all duration-500 flex flex-col justify-between group min-h-[350px] relative overflow-hidden ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-3xl rounded-full" />
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Gem className="text-secondary" size={32} />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-4xl font-black text-white">{features[0].title}</h3>
                <p className="text-white/50 mt-4 text-lg max-w-md">{features[0].description}</p>
              </div>
            </div>
            {features.slice(1).map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`bg-zinc-900 rounded-[2.5rem] p-10 border border-white/5 hover:bg-zinc-800/50 hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[350px] transition-all duration-700 delay-200 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${(i + 1) * 200}ms` }}>
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">{f.title}</h3>
                    <p className="text-white/45 mt-3 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- Gallery --- */}
      <section ref={galleryReveal.ref} className="py-28 px-6 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">The Lookbook</h2>
            <p className="text-white/40 max-w-sm">A visual journey through our latest seasonal edits and editorial features.</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-[2rem] overflow-hidden transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Lookbook ${i + 1}`} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Products (P-STAGGER) --- */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-primary overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-28">
            <p className="text-secondary font-mono tracking-[0.5em] uppercase text-xs mb-4">Shop Affordable Luxury</p>
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white">New Arrivals</h2>
          </div>
          <div className="space-y-40">
            {products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  </div>
                  <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} w-2/3 h-2/3 bg-secondary/10 rounded-[3rem] -z-10 blur-3xl`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="font-mono text-secondary text-sm font-bold tracking-widest uppercase mb-6 block">
                    Collection Piece 0{i + 1}
                  </span>
                  <h3 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-6">{p.name}</h3>
                  <p className="text-white/50 text-xl leading-relaxed mb-8">{p.description}</p>
                  <div className={`flex flex-col gap-8 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                    <span className="text-4xl font-black text-white">{p.price}</span>
                    <a href={`https://wa.me/${contact.whatsapp}?text=I'm interested in the ${p.name}`} className="bg-secondary text-primary px-10 py-5 rounded-full font-black text-lg hover:translate-y-[-4px] transition-transform shadow-xl">
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section (Split + Stats) --- */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-zinc-900 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white mb-10">Our Fashion Story</h2>
            <div className="space-y-6">
              <p className="text-white/60 text-xl leading-relaxed">
                Located in the vibrant Soar Plaza, Shantel Fashion World is Abuja&apos;s premier destination for those who demand style without compromise.
              </p>
              <p className="text-white/40 text-lg leading-relaxed">
                We bridge the gap between high-end designer aesthetics and accessible luxury pricing. Our mission is to empower every individual to express their unique persona through premium fabrics and impeccable designs.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8">
              {stats.map((s, i) => (
                <div key={i} className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <p className="text-3xl md:text-4xl font-heading font-black text-secondary">{s.number}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <SafeImage src="https://images.unsplash.com/photo-1594994043623-ef50cf163197?q=80" alt="Boutique Interior" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="italic text-white/80 text-lg">&ldquo;True style is a reflection of your soul, curated with intention and worn with confidence.&rdquo;</p>
              <p className="text-secondary font-bold mt-4 uppercase tracking-widest text-xs">— The Shantel Philosophy</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Testimonials (T-MASONRY) --- */}
      <section id="testimonials" ref={testimonialsReveal.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white text-center mb-20">Voices of Style</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-zinc-900 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-secondary/20 transition-all duration-500 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-white/80 text-xl leading-relaxed relative z-10 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-8 relative z-10">
                  <div>
                    <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                    <p className="text-secondary/60 text-xs mt-1 uppercase tracking-widest">{t.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3].map(n => <div key={n} className="w-2 h-2 rounded-full bg-secondary/40" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Contact Section (C2) --- */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`bg-zinc-900/60 backdrop-blur-3xl p-8 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-2'}`}>
            <ContactForm />
          </div>
          <div className={`text-left transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-10 leading-tight">Visit Our <br /><span className="text-secondary italic">Boutique</span></h2>
            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Location</h4>
                  <p className="text-white/50 text-lg leading-relaxed">{contact.address}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <Instagram size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">Social</h4>
                  <p className="text-white/50 text-lg leading-relaxed">@shantel_fashion_world</p>
                  <a href={contact.instagram} className="text-secondary font-bold mt-2 inline-block">Follow Edits →</a>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 border border-secondary/20 group-hover:bg-secondary group-hover:text-primary transition-all duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl mb-2">WhatsApp Line</h4>
                  <p className="text-white/50 text-lg leading-relaxed">+{contact.whatsapp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-primary border-t border-white/5 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl">
                  <span className="text-primary font-black text-2xl italic">SF</span>
                </div>
                <span className="text-2xl font-heading font-black tracking-tighter uppercase">Shantel Fashion World</span>
              </div>
              <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-8">
                Abuja&apos;s premier destination for curated affordable luxury. Bridging high-fashion style with everyday elegance.
              </p>
              <div className="flex gap-4">
                <a href={contact.instagram} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-secondary hover:text-secondary transition-all">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-secondary hover:text-secondary transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-8 text-sm uppercase tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Products', 'About', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-secondary transition-colors text-lg">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-8 text-sm uppercase tracking-[0.2em]">Our Presence</h4>
              <p className="text-white/50 text-lg leading-relaxed">
                Gwarimpa, Abuja <br /> Nigeria
              </p>
              <p className="text-secondary font-bold mt-4">Sharp delivery, nationwide.</p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} Shantel Fashion World. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-xs text-white/20 uppercase tracking-widest font-bold">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
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
      <div className="flex flex-col items-center justify-center py-12 text-center animate-scaleIn">
        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 shadow-[0_0_50px_rgba(197,160,89,0.2)]">
          <CheckCheck size={40} className="text-secondary" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4">Request Sent</h3>
        <p className="text-white/60 max-w-sm text-lg leading-relaxed">
          Thank you for reaching out. Our stylist will respond to your inquiry shortly via phone or email.
        </p>
        <button onClick={() => setSent(false)} className="mt-10 text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all">
          Send another message <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-heading text-3xl font-black text-white mb-2">Send an Inquiry</h3>
        <p className="text-white/40 mb-8">Tell us what you&apos;re looking for and we&apos;ll check our latest stock.</p>
      </div>
      <div className="space-y-4">
        {(['name', 'email', 'phone'] as const).map(field => (
          <div key={field} className="relative group">
            <input
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 text-base outline-none transition-all duration-300 focus:bg-white/10 focus:border-secondary/50 group-hover:border-white/20"
            />
          </div>
        ))}
        <div className="relative group">
          <textarea 
            rows={4} 
            placeholder="What items are you interested in? (Bags, Shoes, specific sizes...)"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 text-base outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-secondary/50 group-hover:border-white/20"
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-secondary text-primary py-5 rounded-2xl font-black text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-3 group"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={24} /> Processing...
          </span>
        ) : (
          <>
            Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}