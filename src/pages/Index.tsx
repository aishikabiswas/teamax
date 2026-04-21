import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  Bean,
  CakeSlice,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Sandwich,
  Search,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/teamax-hero.jpg";
import aboutImage from "@/assets/teamax-about.jpg";
import galleryImage from "@/assets/teamax-gallery.jpg";
import customerImage from "@/assets/teamax-customer.jpg";
import { TypingAnimation } from "@/components/ui/typing-animation";

const navItems = ["Home", "About", "Menu", "Gallery", "Reviews", "Contact"];
const whatsappUrl = "https://wa.me/15551234567?text=Hi%20Teamax%2C%20I%27d%20love%20to%20order%20from%20your%20menu.";

const menuItems = [
  { icon: Coffee, category: "Coffee", name: "Velvet Orange Latte", description: "Espresso, steamed milk, caramel zest and latte art.", price: "$5.80", popular: true },
  { icon: Bean, category: "Tea", name: "Golden Saffron Tea", description: "Slow-brewed black tea with honeyed saffron warmth.", price: "$4.90", popular: true },
  { icon: Sparkles, category: "Shakes", name: "Date Cocoa Shake", description: "Creamy cocoa, dates, vanilla and toasted almond.", price: "$6.50", popular: false },
  { icon: CakeSlice, category: "Desserts", name: "Rose Pistachio Cake", description: "Soft sponge, rose cream and roasted pistachio crumb.", price: "$7.20", popular: true },
  { icon: Sandwich, category: "Snacks", name: "Truffle Melt Toastie", description: "Golden sourdough with cheese, herbs and truffle oil.", price: "$8.40", popular: false },
];

const reasons = [
  { icon: Coffee, title: "Freshly Brewed Daily", text: "Small-batch brews prepared throughout the day." },
  { icon: Sparkles, title: "Premium Ingredients", text: "Selected beans, teas, fruit and bakery staples." },
  { icon: Wifi, title: "Free WiFi", text: "A calm corner for work, study or planning." },
  { icon: Heart, title: "Cozy Ambience", text: "Warm lighting, soft seats and relaxed music." },
  { icon: Zap, title: "Fast Service", text: "Crafted quickly without compromising quality." },
  { icon: Users, title: "Friendly Staff", text: "Hospitality that feels personal every visit." },
];

const gallery = [
  { src: heroImage, title: "Warm café counter", className: "md:row-span-2" },
  { src: aboutImage, title: "Latte, tea and croissants", className: "" },
  { src: galleryImage, title: "Desserts with friends", className: "md:col-span-2" },
  { src: customerImage, title: "Happy Teamax guest", className: "" },
];

const reviews = [
  { name: "Maya R.", text: "Teamax is my little golden-hour ritual. The latte is silky, the desserts are stunning, and every corner photographs beautifully.", image: customerImage },
  { name: "Aarav K.", text: "Perfect for meetings and slow weekends. Warm staff, reliable WiFi, and the saffron tea is unforgettable.", image: galleryImage },
  { name: "Lina S.", text: "The ambience feels premium without being stiff. I ordered through WhatsApp and pickup was seamless.", image: aboutImage },
];

const scrollTo = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const isOpen = useMemo(() => {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    return day === 0 || day === 6 ? hour >= 9 && hour < 23 : hour >= 8 && hour < 22;
  }, []);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16 },
    );
    reveals.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setReviewIndex((current) => (current + 1) % reviews.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? "Your 10% welcome offer is on the way." : "Please enter a valid email address.");
    if (valid) setEmail("");
  };

  const currentReview = reviews[reviewIndex];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <nav className="glass-nav fixed inset-x-0 top-0 z-50">
        <div className="section-shell flex h-20 items-center justify-between">
          <button onClick={() => scrollTo("home")} className="group flex items-center gap-3" aria-label="Teamax home">
            <span className="grid size-11 place-items-center rounded-full bg-gradient-warm shadow-glow transition-transform duration-300 group-hover:scale-105">
              <Coffee className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display text-3xl text-foreground">Teamax</span>
          </button>
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
                {item}
              </button>
            ))}
          </div>
          <div className="hidden lg:block">
            <Button variant="hero" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">Order Now</a></Button>
          </div>
          <button className="grid size-11 place-items-center rounded-full border border-border bg-card lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-border bg-card lg:hidden">
            <div className="section-shell grid gap-3 py-4">
              {navItems.map((item) => <button key={item} onClick={() => { scrollTo(item); setMobileOpen(false); }} className="rounded-md px-4 py-3 text-left font-semibold hover:bg-muted">{item}</button>)}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative flex min-h-screen items-center pb-16 pt-28">
        <img src={heroImage} alt="Warm premium Teamax café interior with latte art" className="absolute inset-0 h-full w-full object-cover" width={1600} height={960} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="coffee-bean left-[7%] top-[26%] h-10 w-6 rotate-12 animate-float" />
        <div className="coffee-bean bottom-[19%] right-[12%] h-12 w-7 -rotate-12 animate-float [animation-delay:1.2s]" />
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl animate-fade-up text-primary-foreground">
            <p className="mb-5 inline-flex rounded-full border border-cafe-yellow/30 bg-primary-foreground/15 px-4 py-2 text-sm backdrop-blur-md">Premium coffee, tea & cozy moments</p>
            <h1 className="text-4xl font-display leading-[0.96] sm:text-7xl lg:text-8xl">Brewed for Moments, Served with Love</h1>
            <TypingAnimation className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/90 sm:text-xl">Fresh coffee, artisan tea, desserts, and unforgettable ambiance.</TypingAnimation>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => scrollTo("menu")}>View Menu</Button>
              <Button variant="cream" size="lg" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />Order on WhatsApp</a></Button>
            </div>
          </div>
          <div className="hidden rounded-lg border border-primary-foreground/25 bg-primary-foreground/15 p-5 text-primary-foreground shadow-soft backdrop-blur-md lg:block">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-3xl">Today at Teamax</span>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">{isOpen ? "Open Now" : "Opening Soon"}</span>
            </div>
            <p className="mt-3 text-primary-foreground/85">Reserve a table, grab a dessert box, or order your favorite latte in one tap.</p>
          </div>
        </div>
        <button onClick={() => scrollTo("about")} className="absolute bottom-7 left-1/2 z-10 grid -translate-x-1/2 place-items-center text-primary-foreground" aria-label="Scroll to about">
          <ArrowDown className="size-7 animate-bounce" />
        </button>
      </section>

      <section id="about" className="bg-gradient-soft py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal relative">
            <img src={aboutImage} alt="Teamax handcrafted coffee tea and croissants" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full rounded-lg object-cover shadow-card" />
            <div className="absolute -bottom-6 right-6 max-w-xs rounded-lg bg-card p-5 shadow-glow"><p className="font-display text-2xl">Handcrafted warmth in every cup.</p></div>
          </div>
          <div className="reveal">
            <p className="inline-flex px-3 py-1 text-sm text-cafe-orange border-2 border-cafe-yellow font-semibold uppercase tracking-[2.2] rounded-full">Our story</p>
            <h2 className="mt-3 text-4xl sm:text-6xl">A cozy café made for work, conversations and slow sips.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Teamax began with a simple belief: the best cafés make everyday moments feel special. Our baristas craft beverages with care, our desserts are made with fresh ingredients, and our space is designed for warm hospitality from morning focus sessions to evening catch-ups.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Handcrafted beverages", "Fresh ingredients", "Warm hospitality"].map((item) => <div key={item} className="rounded-md border border-border bg-card p-4 font-semibold shadow-soft"><CheckCircle2 className="mb-3 size-5 text-primary" />{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-24">
        <div className="section-shell">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="inline-flex px-3 py-1 text-sm text-cafe-orange border-2 border-cafe-yellow font-semibold uppercase tracking-[2.2] rounded-full mb-2">Signature menu</p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-6xl">Popular picks with a golden Teamax twist.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {menuItems.map(({ icon: Icon, ...item }) => (
              <article key={item.name} className="warm-card reveal rounded-lg bg-gradient-card p-6">
                <div className="mb-5 flex items-center justify-between"><span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="size-6" /></span>{item.popular && <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">Popular Picks</span>}</div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{item.category}</p>
                <h3 className="mt-3 text-2xl">{item.name}</h3>
                <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <p className="mt-5 font-display text-3xl text-primary">{item.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="section-shell">
          <div className="reveal flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="inline-flex px-3 py-1 text-sm text-cafe-orange border-2 border-cafe-yellow font-semibold uppercase tracking-[2.2] rounded-full mb-2">Why choose us</p><h2 className="mt-3 text-4xl sm:text-6xl">Comfort, quality and quick service.</h2></div><Button variant="cream" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">Order Now</a></Button></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => <div key={title} className="warm-card reveal rounded-lg p-6"><Icon className="mb-5 size-8 text-primary" /><h3 className="font-display text-2xl ">{title}</h3><p className="mt-3 text-muted-foreground">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24">
        <div className="section-shell">
          <div className="reveal mx-auto max-w-3xl text-center"><p className="section-kicker">Gallery</p><h2 className="mt-3 text-4xl font-bold sm:text-6xl">Every corner is worth sharing.</h2></div>
          <div className="mt-12 grid auto-rows-[260px] gap-5 md:grid-cols-3">
            {gallery.map((item, index) => <button key={item.title} onClick={() => setLightbox(index)} className={`group reveal relative overflow-hidden rounded-lg shadow-card ${item.className}`}><img src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute inset-0 grid place-items-center bg-foreground/0 text-primary-foreground opacity-0 transition-all duration-300 group-hover:bg-foreground/35 group-hover:opacity-100"><Search className="size-10" /></span></button>)}
          </div>
        </div>
      </section>

      <section className="bg-gradient-soft py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="warm-card reveal rounded-lg p-8"><p className="section-kicker">Opening hours</p><h2 className="mt-3 text-4xl font-bold">Drop in while the coffee is hot.</h2><div className="mt-8 space-y-4 text-lg"><div className="flex justify-between border-b border-border pb-4"><span>Mon–Fri</span><strong>8 AM – 10 PM</strong></div><div className="flex justify-between"><span>Sat–Sun</span><strong>9 AM – 11 PM</strong></div></div><span className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-5 py-3 font-bold text-primary-foreground"><Clock className="size-5" />{isOpen ? "Open Now" : "Closed Right Now"}</span></div>
          <div id="reviews" className="reveal rounded-lg bg-card p-7 shadow-card"><div className="flex items-center gap-1 text-secondary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-5 fill-current" />)}</div><p className="mt-6 text-2xl leading-10 text-foreground">“{currentReview.text}”</p><div className="mt-7 flex items-center justify-between gap-4"><div className="flex items-center gap-4"><img src={currentReview.image} alt={`${currentReview.name} review profile`} loading="lazy" className="size-14 rounded-full object-cover" /><strong>{currentReview.name}</strong></div><div className="flex gap-2"><button onClick={() => setReviewIndex((reviewIndex + reviews.length - 1) % reviews.length)} className="grid size-10 place-items-center rounded-full border border-border"><ChevronLeft className="size-5" /></button><button onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} className="grid size-10 place-items-center rounded-full border border-border"><ChevronRight className="size-5" /></button></div></div></div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <div className="reveal overflow-hidden rounded-lg shadow-card"><iframe title="Teamax location map" src="https://www.google.com/maps?q=cafe&output=embed" loading="lazy" className="h-[460px] w-full border-0" referrerPolicy="no-referrer-when-downgrade" /></div>
          <div className="warm-card reveal rounded-lg p-8"><p className="section-kicker">Visit Teamax</p><h2 className="mt-3 text-4xl">Find your warm corner.</h2><div className="mt-8 grid gap-4"><p className="flex gap-3"><MapPin className="size-6 text-primary" /> 24 Amber Lane, Downtown Café District</p><p className="flex gap-3"><Phone className="size-6 text-primary" /> +1 (555) 123-4567</p><p className="flex gap-3"><Mail className="size-6 text-primary" /> hello@teamax.cafe</p></div><div className="mt-8 flex flex-wrap gap-3"><Button variant="hero" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />WhatsApp Us</a></Button><Button variant="cream" asChild><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram className="size-5" />Instagram</a></Button><Button variant="cream" asChild><a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook className="size-5" />Facebook</a></Button></div></div>
        </div>
      </section>

      <footer className="bg-cafe-cocoa py-14 text-primary-foreground">
  <div className="section-shell">
    
    <div className="grid gap-10 md:grid-cols-3 md:items-start">
      
      {/* Brand */}
      <div>
        <div className="font-display text-4xl tracking-wide">
          Teamax
        </div>

        <p className="mt-3 max-w-sm text-sm leading-6 text-primary-foreground/75">
          Where every sip feels special. Teamax brings together handcrafted
          coffee, premium teas, delightful desserts, and a warm atmosphere made
          for conversations, work sessions, and cozy moments.
        </p>

        <p className="mt-4 text-sm text-primary-foreground/70">
          📍 Your City, India <br />
          ☎ +91 98765 43210 <br />
          ✉ hello@teamax.com
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>

        <div className="flex flex-col gap-3 text-sm">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-left transition hover:text-secondary"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Opening Hours */}
      <div>
        <h4 className="mb-4 text-lg font-semibold">Opening Hours</h4>

        <div className="space-y-2 text-sm text-primary-foreground/75">
          <p>Mon – Fri: 8:00 AM – 10:00 PM</p>
          <p>Sat – Sun: 9:00 AM – 11:00 PM</p>
          <p className="pt-2 text-secondary font-medium">
            Fresh brews served daily ☕
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-10 border-t border-primary-foreground/10 pt-6 flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
      
      <p className="text-primary-foreground/70">
        © {new Date().getFullYear()} Teamax Café. All rights reserved.
      </p>

      <p className="text-primary-foreground/70">
        Made with ❤️ | Developed & Maintained by{" "}
        <a
          href="https://evionadigital.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-secondary hover:underline"
        >
          Eviona Digital
        </a>
      </p>
    </div>
  </div>
</footer>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Teamax on WhatsApp" className="fixed bottom-24 right-5 z-40 grid size-14 place-items-center rounded-full bg-gradient-warm text-primary-foreground shadow-glow transition-transform hover:scale-105 md:bottom-6"><MessageCircle className="size-7" /></a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 shadow-soft backdrop-blur-md md:hidden"><Button variant="hero" className="w-full" asChild><a href={whatsappUrl} target="_blank" rel="noreferrer">Order Teamax on WhatsApp</a></Button></div>

      {lightbox !== null && <div className="fixed inset-0 z-[60] grid place-items-center bg-foreground/80 p-4" onClick={() => setLightbox(null)}><button className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-card text-foreground" aria-label="Close gallery preview"><X className="size-5" /></button><img src={gallery[lightbox].src} alt={gallery[lightbox].title} className="max-h-[86vh] w-full max-w-5xl rounded-lg object-contain shadow-card" /></div>}
    </main>
  );
};

export default Index;
