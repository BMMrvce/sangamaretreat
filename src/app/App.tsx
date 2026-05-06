import { useState, useEffect, useRef } from "react";
import {
  MapPin, Phone, Mail, Instagram, Facebook, Youtube,
  ChevronDown, Menu, X, Star, Check, ArrowRight,
  Wifi, Coffee, Wind, Tv, Car, Users,
  Mountain, Bike, Trophy, Gamepad2, Target,
  ChevronRight, MessageCircle, Leaf, Heart,
  Sparkles, Award, ZoomIn, Dumbbell,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import { imgAerial, imgPool, imgVilla, imgPlayArea, imgBuddha } from "@/assets/hero";
import { imgStdRoom, imgQuadRoom, imgRopeArch, imgOutdoorGym2, imgKidsPlay, imgOutdoorGym1 } from "@/assets/gallery";

const PHONE = "+919353556617";
const PHONE_DISPLAY = "+91 93535 56617";
const ADDRESS = "Kanakapura-Sangam Road, Elagalli, Uyyamballi Hobli, Kanakapura, Karnataka 562117";
const WA_LINK = `https://wa.me/${PHONE}?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Sangama%20Retreat`;

// ── hooks ────────────────────────────────────────────────────────────────────
function useScrolled(px = 60) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const h = () => setS(window.scrollY > px);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [px]);
  return s;
}

function useFade(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } },
      { threshold }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, vis };
}

function useCount(target: number, go: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let v = 0;
    const step = target / 80;
    const id = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(id); }
      else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(id);
  }, [go, target]);
  return n;
}

// ── primitives ───────────────────────────────────────────────────────────────
function Fade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, vis } = useFade();
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(18px)", transition: `opacity .5s ${delay}ms ease, transform .5s ${delay}ms ease` }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-medium" style={{ fontFamily: "'Jost',sans-serif", color: "#C4A45A" }}>
      <span className="w-7 h-px bg-current opacity-60" />{children}<span className="w-7 h-px bg-current opacity-60" />
    </span>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const sc = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    { l: "About",      h: "#about" },
    { l: "Rooms",      h: "#rooms" },
    { l: "Activities", h: "#activities" },
    { l: "Gallery",    h: "#gallery" },
    { l: "Contact",    h: "#contact" },
  ];
  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${sc ? "bg-[#1A2416]/96 backdrop-blur-sm py-3 shadow-lg" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#" className="leading-none">
          <div className="text-[#C4A45A] font-bold tracking-[.15em] text-xl uppercase" style={{ fontFamily: "'Oswald',sans-serif" }}>Sangama</div>
          <div className="text-white/60 text-[10px] tracking-[.3em] uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>Retreat</div>
        </a>
        <ul className="hidden md:flex gap-7">
          {links.map(({ l, h }) => (
            <li key={l}>
              <a href={h} className="text-white/75 hover:text-[#C4A45A] text-sm tracking-widest uppercase transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex gap-2">
          <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 px-4 py-2 border border-white/30 text-white/75 text-sm hover:border-[#C4A45A] hover:text-[#C4A45A] transition-all" style={{ fontFamily: "'Jost',sans-serif" }}>
            <Phone size={13} /> Call
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-[#C4A45A] text-[#1A2416] text-sm font-semibold tracking-wider uppercase hover:bg-[#d4b46a] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
            Book Now
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white"><Menu size={22} /></button>
      </div>
      {open && (
        <div className="md:hidden bg-[#1A2416] px-5 py-5 flex flex-col gap-4 border-t border-white/10">
          {links.map(({ l, h }) => (
            <a key={l} href={h} onClick={() => setOpen(false)} className="text-white/75 text-sm tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>{l}</a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-3 bg-[#C4A45A] text-[#1A2416] text-sm font-bold tracking-wider uppercase text-center">Book Now</a>
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0);
  const slides = [imgAerial, imgBuddha, imgPool, imgVilla, imgPlayArea];
  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden">
      {slides.map((src, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: idx === i ? 1 : 0 }}>
          <ImageWithFallback src={src} alt="Sangama Retreat" loading={i === 0 ? "eager" : "lazy"} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/78" />
        </div>
      ))}
      <div className="relative z-10 text-center px-5 max-w-5xl">
        <p className="text-[#C4A45A] text-[11px] tracking-[.4em] uppercase mb-4" style={{ fontFamily: "'Jost',sans-serif" }}>Welcome to Sangama Retreat</p>
        <h1 className="text-white font-bold leading-none mb-5" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(2.4rem,7.5vw,6rem)", letterSpacing: ".02em" }}>
          Escape Into Nature<br /><span className="text-[#C4A45A]">at Sangama Retreat</span>
        </h1>
        <p className="text-white/70 max-w-xl mx-auto mb-9 text-base leading-relaxed" style={{ fontFamily: "'Lora',serif" }}>
          Luxury stays, adventure activities, and unforgettable experiences surrounded by nature.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold tracking-[.12em] uppercase text-sm hover:bg-[#20b858] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
            <MessageCircle size={17} /> WhatsApp Us
          </a>
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-7 py-3.5 bg-[#C4A45A] text-[#1A2416] font-semibold tracking-[.12em] uppercase text-sm hover:bg-[#d4b46a] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
            <Phone size={17} /> Call Now
          </a>
          <a href="#about" className="px-7 py-3.5 border border-white/50 text-white text-sm tracking-[.12em] uppercase hover:border-[#C4A45A] hover:text-[#C4A45A] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
            Explore Retreat
          </a>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={26} className="text-white/50" />
      </div>
      <div className="absolute bottom-7 right-7 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "bg-[#C4A45A] w-6" : "bg-white/35 w-2"}`} />
        ))}
      </div>
    </section>
  );
}

// ── FLOATING BUTTONS ─────────────────────────────────────────────────────────
function FloatingBtns() {
  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-3">
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="w-[52px] h-[52px] bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform" title="WhatsApp">
        <MessageCircle size={22} className="text-white" />
      </a>
      <a href={`tel:${PHONE}`}
        className="w-[52px] h-[52px] bg-[#2D5016] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform" title="Call Us">
        <Phone size={20} className="text-white" />
      </a>
    </div>
  );
}

// ── STATS ────────────────────────────────────────────────────────────────────
function StatBox({ val, suf, lbl, go }: { val: number; suf: string; lbl: string; go: boolean }) {
  const n = useCount(val, go);
  return (
    <div className="text-center">
      <div className="text-[#C4A45A] font-bold leading-none mb-1" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "3.2rem" }}>{n.toLocaleString()}{suf}</div>
      <div className="text-white/55 text-[11px] tracking-[.2em] uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>{lbl}</div>
    </div>
  );
}
function Stats() {
  const { ref, vis } = useFade();
  const rows = [{ val: 12, suf: "+", lbl: "Acres of Nature" }, { val: 3, suf: "", lbl: "Room Types" }, { val: 20, suf: "+", lbl: "Activities" }, { val: 5000, suf: "+", lbl: "Happy Guests" }];
  return (
    <div ref={ref} className="bg-[#1A2416] py-14">
      <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8">
        {rows.map((r, i) => <StatBox key={i} val={r.val} suf={r.suf} lbl={r.lbl} go={vis} />)}
      </div>
    </div>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 grid lg:grid-cols-2 gap-14 items-center">
        <Fade className="relative h-[500px]">
          <div className="absolute top-0 left-0 w-[73%] h-[76%] overflow-hidden shadow-2xl bg-[#2D5016]/10">
            <ImageWithFallback src={imgVilla} alt="2BHK Villa garden entrance" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute bottom-0 right-0 w-[50%] h-[46%] overflow-hidden shadow-xl border-4 border-background bg-[#2D5016]/10">
            <ImageWithFallback src={imgBuddha} alt="Zen Buddha garden" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute top-[36%] left-[56%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#C4A45A] flex flex-col items-center justify-center shadow-xl z-10">
            <span className="text-[#1A2416] font-bold text-xl leading-none" style={{ fontFamily: "'Oswald',sans-serif" }}>5★</span>
            <span className="text-[#1A2416] text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>Luxury</span>
          </div>
        </Fade>
        <Fade delay={150}>
          <Label>Our Story</Label>
          <h2 className="mt-3 mb-5 font-bold leading-tight" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>
            A Premium Nature<br /><span className="text-[#2D5016]">Getaway Like No Other</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5 text-[.97rem]" style={{ fontFamily: "'Lora',serif" }}>
            Sangama Retreat is where luxury meets the wild. Nestled amidst lush greenery along the Kanakapura road, we offer a rare blend of premium comfort, untamed nature, and boundless adventure — where the city fades and the soul breathes.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-7 text-[.97rem]" style={{ fontFamily: "'Lora',serif" }}>
            Whether you seek solitude, thrills on the trails, or joyful moments with family, Sangama wraps it all in genuine warmth and impeccable hospitality.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-7">
            {["Peaceful green surroundings", "Adventure for all ages", "Premium curated stays", "Genuine warm hospitality"].map(f => (
              <div key={f} className="flex items-center gap-2">
                <Check size={15} className="text-[#C4A45A] flex-shrink-0" />
                <span className="text-sm" style={{ fontFamily: "'Jost',sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D5016] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#3d6020] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
            Enquire Now <ArrowRight size={15} />
          </a>
        </Fade>
      </div>
    </section>
  );
}

// ── ROOMS ────────────────────────────────────────────────────────────────────
type IconComp = React.FC<{ size?: number; className?: string }>;

const ROOMS: {
  name: string; price: string; unit: string; badge: string; occupancy: string;
  img: string; alt: string; desc: string; icons: IconComp[]; iLbls: string[];
}[] = [
  {
    name: "Standard Room", price: "₹3,000", unit: "/person", badge: "Popular", occupancy: "2 Guests",
    img: imgStdRoom, alt: "Standard room with garden view",
    desc: "Thoughtfully appointed rooms with lush garden views and curated amenities for a peaceful retreat.",
    icons: [Wifi, Coffee, Wind, Tv], iLbls: ["WiFi", "Café", "AC", "TV"],
  },
  {
    name: "Quad Room", price: "₹2,750", unit: "/person", badge: "Best Value", occupancy: "4 Guests",
    img: imgQuadRoom, alt: "Quad room building exterior",
    desc: "Vibrant quad-occupancy rooms ideal for groups and families seeking shared adventures in nature.",
    icons: [Wifi, Coffee, Wind, Car], iLbls: ["WiFi", "Café", "AC", "Parking"],
  },
  {
    name: "2BHK Villa", price: "₹3,500", unit: "/person", badge: "Premium", occupancy: "6 Guests",
    img: imgVilla, alt: "2BHK Villa with tropical garden",
    desc: "Private two-bedroom villas with tropical gardens, premium furnishings, and exclusive tranquil access.",
    icons: [Wifi, Coffee, Wind, Tv], iLbls: ["WiFi", "Café", "AC", "TV"],
  },
];

function Rooms() {
  return (
    <section id="rooms" className="min-h-screen flex items-center py-20 bg-[#f0ead8]">
      <div className="max-w-7xl mx-auto px-5">
        <Fade className="text-center mb-12">
          <Label>Accommodations</Label>
          <h2 className="mt-3 font-bold" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>Your Forest Sanctuary Awaits</h2>
        </Fade>
        <div className="grid md:grid-cols-3 gap-7">
          {ROOMS.map((r, i) => (
            <Fade key={r.name} delay={i * 100} className="group bg-card shadow-md overflow-hidden flex flex-col">
              <div className="relative h-60 overflow-hidden bg-[#2D5016]/10">
                <ImageWithFallback src={r.img} alt={r.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#C4A45A] text-[#1A2416] text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>{r.badge}</span>
                <div className="absolute bottom-3 left-4">
                  <span className="text-white font-bold text-2xl" style={{ fontFamily: "'Oswald',sans-serif" }}>{r.price}</span>
                  <span className="text-white/65 text-sm ml-1" style={{ fontFamily: "'Jost',sans-serif" }}>{r.unit}</span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: ".05em" }}>{r.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs" style={{ fontFamily: "'Jost',sans-serif" }}><Users size={12} />{r.occupancy}</div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Lora',serif" }}>{r.desc}</p>
                <div className="flex gap-4 mb-5">
                  {r.icons.map((Ic, j) => (
                    <div key={j} className="flex flex-col items-center gap-1 text-[#2D5016]">
                      <Ic size={17} />
                      <span className="text-[9px] text-muted-foreground" style={{ fontFamily: "'Jost',sans-serif" }}>{r.iLbls[j]}</span>
                    </div>
                  ))}
                </div>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#20b858] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>
                  <MessageCircle size={16} /> Book via WhatsApp
                </a>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ACTIVITIES ───────────────────────────────────────────────────────────────
const OUT_ACTS: { n: string; I: IconComp }[] = [
  { n: "Cricket", I: Trophy }, { n: "Volleyball", I: Target }, { n: "Shuttle Cock", I: Target },
  { n: "Basketball", I: Trophy }, { n: "Outdoor Gym", I: Dumbbell }, { n: "ATV Bike", I: Bike },
];
const IN_ACTS: { n: string; I: IconComp }[] = [
  { n: "Snooker", I: Gamepad2 }, { n: "Table Tennis", I: Gamepad2 }, { n: "Football", I: Gamepad2 },
  { n: "Carrom", I: Gamepad2 }, { n: "Chess", I: Gamepad2 },
];
const EXP: { n: string; I: IconComp; img: string; alt: string }[] = [
  { n: "Swimming Pool", I: Sparkles, img: imgPool, alt: "Swimming pool" },
  { n: "Outdoor Gym", I: Dumbbell, img: imgOutdoorGym1, alt: "Outdoor gym" },
  { n: "Kids Play Area", I: Heart, img: imgKidsPlay, alt: "Kids play area" },
  { n: "Activity Area", I: Mountain, img: imgRopeArch, alt: "Activity area" },
  { n: "Zen Garden", I: Leaf, img: imgBuddha, alt: "Zen Buddha garden" },
];
const CS = [
  { n: "Rope Activity", d: "Aerial rope courses through the forest canopy" },
  { n: "Zip Line", d: "Soar across the valley on a thrilling zip line" },
  { n: "Sky Cycling", d: "Pedal through the sky on a suspended track" },
];

function Activities() {
  const [tab, setTab] = useState<"exp" | "out" | "in">("exp");
  return (
    <section id="activities" className="min-h-screen flex items-center py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5">
        <Fade className="text-center mb-12">
          <Label>Thrills &amp; Leisure</Label>
          <h2 className="mt-3 font-bold" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>Adventures for Every Soul</h2>
        </Fade>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["exp", "out", "in"] as const).map(k => (
            <button key={k} onClick={() => setTab(k)}
              className={`px-5 py-2 text-sm font-medium tracking-widest uppercase transition-all ${tab === k ? "bg-[#2D5016] text-white" : "border border-border text-muted-foreground hover:border-[#2D5016] hover:text-[#2D5016]"}`}
              style={{ fontFamily: "'Jost',sans-serif" }}>
              {k === "exp" ? "Experiences" : k === "out" ? "Outdoor" : "Indoor"}
            </button>
          ))}
        </div>
        {tab === "exp" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {EXP.map((e, i) => (
              <Fade key={e.n} delay={i * 70} className="relative h-60 overflow-hidden group bg-[#2D5016]/10">
                <ImageWithFallback src={e.img} alt={e.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center">
                  <e.I size={24} className="text-[#C4A45A] mb-1.5" />
                  <span className="text-white text-sm font-semibold tracking-wider uppercase text-center" style={{ fontFamily: "'Jost',sans-serif" }}>{e.n}</span>
                </div>
              </Fade>
            ))}
          </div>
        )}
        {tab === "out" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {OUT_ACTS.map((a, i) => (
              <Fade key={a.n} delay={i * 60} className="bg-card border border-border hover:border-[#C4A45A] hover:shadow-md transition-all p-5 flex flex-col items-center gap-3 group">
                <div className="w-11 h-11 rounded-full bg-[#2D5016]/10 flex items-center justify-center group-hover:bg-[#C4A45A]/20 transition-colors"><a.I size={20} className="text-[#2D5016]" /></div>
                <span className="text-sm font-medium text-center" style={{ fontFamily: "'Jost',sans-serif" }}>{a.n}</span>
              </Fade>
            ))}
          </div>
        )}
        {tab === "in" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {IN_ACTS.map((a, i) => (
              <Fade key={a.n} delay={i * 60} className="bg-card border border-border hover:border-[#C4A45A] hover:shadow-md transition-all p-5 flex flex-col items-center gap-3 group">
                <div className="w-11 h-11 rounded-full bg-[#2D5016]/10 flex items-center justify-center group-hover:bg-[#C4A45A]/20 transition-colors"><a.I size={20} className="text-[#2D5016]" /></div>
                <span className="text-sm font-medium text-center" style={{ fontFamily: "'Jost',sans-serif" }}>{a.n}</span>
              </Fade>
            ))}
          </div>
        )}
        <div className="mt-16">
          <Fade className="text-center mb-8">
            <Label>Coming Soon</Label>
            <h3 className="mt-2 font-bold text-xl" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: ".05em" }}>More Thrills on the Horizon</h3>
          </Fade>
          <div className="grid sm:grid-cols-3 gap-5">
            {CS.map((c, i) => (
              <Fade key={c.n} delay={i * 80} className="bg-[#1A2416] border border-[#C4A45A]/20 hover:border-[#C4A45A]/50 p-7 transition-colors">
                <span className="inline-block px-2.5 py-0.5 border border-[#C4A45A]/50 text-[#C4A45A] text-[10px] tracking-[.2em] uppercase mb-3" style={{ fontFamily: "'Jost',sans-serif" }}>Coming Soon</span>
                <h4 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Oswald',sans-serif" }}>{c.n}</h4>
                <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'Lora',serif" }}>{c.d}</p>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GALLERY ──────────────────────────────────────────────────────────────────
const GALLERY = [
  { src: imgPool,        alt: "Swimming pool",           span: "col-span-2 row-span-2" },
  { src: imgStdRoom,     alt: "Standard room",           span: "" },
  { src: imgQuadRoom,    alt: "Quad room building",      span: "" },
  { src: imgBuddha,      alt: "Zen Buddha garden",       span: "" },
  { src: imgRopeArch,    alt: "Activity area",           span: "" },
  { src: imgVilla,       alt: "2BHK Villa entrance",     span: "col-span-2" },
  { src: imgOutdoorGym2, alt: "Outdoor gym equipment",   span: "" },
  { src: imgKidsPlay,    alt: "Kids play area",          span: "" },
  { src: imgOutdoorGym1, alt: "Gym and seating area",    span: "" },
  { src: imgPlayArea,    alt: "Full activity play area", span: "" },
];

function Gallery() {
  const [lb, setLb] = useState<string | null>(null);
  return (
    <section id="gallery" className="min-h-screen flex items-center py-20 bg-[#f0ead8]">
      <div className="max-w-7xl mx-auto px-5">
        <Fade className="text-center mb-12">
          <Label>Visual Journey</Label>
          <h2 className="mt-3 font-bold" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>Moments at Sangama</h2>
        </Fade>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[175px] gap-2.5">
          {GALLERY.map((g, i) => (
            <div key={i} className={`${g.span} relative overflow-hidden group cursor-pointer bg-[#2D5016]/10`} onClick={() => setLb(g.src)}>
              <ImageWithFallback src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <ZoomIn size={26} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {lb && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setLb(null)}>
          <button className="absolute top-5 right-5 text-white hover:text-[#C4A45A]" onClick={() => setLb(null)}><X size={28} /></button>
          <img src={lb} alt="Gallery" className="max-w-full max-h-[88vh] object-contain" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

// ── WHY US ───────────────────────────────────────────────────────────────────
const FEATS: { I: IconComp; t: string; d: string }[] = [
  { I: Leaf,     t: "Luxury Nature Stay",    d: "Premium rooms and villas immersed in lush greenery for pure rejuvenation." },
  { I: Mountain, t: "Adventure Experiences", d: "ATV rides, rope activities, and trekking for every skill level." },
  { I: Heart,    t: "Family Friendly",       d: "Curated spaces and activities that bring families and groups closer." },
  { I: Award,    t: "Premium Hospitality",   d: "Warm, attentive service ensuring every stay is truly memorable." },
  { I: Dumbbell, t: "20+ Activities",        d: "Outdoor, indoor, and experiential activities available round the clock." },
  { I: Sparkles, t: "Scenic Environment",    d: "Breathtaking natural landscapes and a serene atmosphere throughout." },
];

function WhyUs() {
  return (
    <section className="min-h-screen flex items-center py-20 bg-background">
      <div className="max-w-7xl mx-auto px-5">
        <Fade className="text-center mb-12">
          <Label>Why Sangama</Label>
          <h2 className="mt-3 font-bold" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>Crafted for the Extraordinary</h2>
        </Fade>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATS.map((f, i) => (
            <Fade key={f.t} delay={i * 70} className="group p-7 border border-border hover:border-[#C4A45A] hover:shadow-lg bg-card transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#2D5016]/10 flex items-center justify-center mb-4 group-hover:bg-[#C4A45A]/20 transition-colors">
                <f.I size={24} className="text-[#2D5016]" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: ".05em" }}>{f.t}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "'Lora',serif" }}>{f.d}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="min-h-screen relative py-20 overflow-hidden flex items-center" style={{ background: "linear-gradient(135deg,#1A2416 0%,#2D5016 55%,#1A2416 100%)" }}>
      <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C4A45A 1px, transparent 0)", backgroundSize: "38px 38px" }} />
      <div className="relative max-w-5xl mx-auto px-5">
        <Fade className="text-center mb-12">
          <Label>Get In Touch</Label>
          <h2 className="mt-3 font-bold text-white" style={{ fontFamily: "'Oswald',sans-serif", fontSize: "clamp(1.9rem,3.5vw,2.8rem)", letterSpacing: ".02em" }}>
            Ready to Escape to Sangama?
          </h2>
          <p className="mt-3 text-white/60 max-w-lg mx-auto text-[.97rem]" style={{ fontFamily: "'Lora',serif" }}>
            Reach us directly — we respond instantly on WhatsApp or call us to plan your perfect stay.
          </p>
        </Fade>

        {/* Big CTA buttons */}
        <Fade delay={100} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white font-bold tracking-[.15em] uppercase text-base hover:bg-[#20b858] transition-colors shadow-2xl"
            style={{ fontFamily: "'Jost',sans-serif" }}>
            <MessageCircle size={22} /> Chat on WhatsApp
          </a>
          <a href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-[#C4A45A] text-[#1A2416] font-bold tracking-[.15em] uppercase text-base hover:bg-[#d4b46a] transition-colors shadow-2xl"
            style={{ fontFamily: "'Jost',sans-serif" }}>
            <Phone size={22} /> {PHONE_DISPLAY}
          </a>
        </Fade>

        {/* Info cards */}
        <Fade delay={200} className="grid sm:grid-cols-3 gap-5">
          {[
            { I: Phone,  title: "Call Us",     val: PHONE_DISPLAY,                        href: `tel:${PHONE}` },
            { I: MessageCircle, title: "WhatsApp", val: PHONE_DISPLAY,                    href: WA_LINK },
            { I: MapPin, title: "Find Us",     val: ADDRESS,                              href: "#" },
          ].map(({ I, title, val, href }) => (
            <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-6 group"
              style={{ background: "rgba(255,255,255,.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(196,164,90,.15)" }}>
              <div className="w-12 h-12 bg-[#C4A45A]/20 flex items-center justify-center mb-4 group-hover:bg-[#C4A45A]/40 transition-colors">
                <I size={22} className="text-[#C4A45A]" />
              </div>
              <div className="text-[#C4A45A] text-[11px] tracking-[.2em] uppercase font-semibold mb-2" style={{ fontFamily: "'Jost',sans-serif" }}>{title}</div>
              <div className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Jost',sans-serif" }}>{val}</div>
            </a>
          ))}
        </Fade>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f1a0d] text-white">
      <div className="mx-auto px-5 py-14" style={{ maxWidth: "80%" }}>
        <div className="grid md:grid-cols-4 gap-9">
          <div className="md:col-span-1">
            <div className="text-[#C4A45A] font-bold text-2xl tracking-[.15em] uppercase mb-0.5" style={{ fontFamily: "'Oswald',sans-serif" }}>Sangama</div>
            <div className="text-white/45 text-[10px] tracking-[.3em] uppercase mb-4" style={{ fontFamily: "'Jost',sans-serif" }}>Retreat</div>
            <p className="text-white/45 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Lora',serif" }}>
              A premium nature retreat offering luxury stays, adventure activities, and unforgettable experiences.
            </p>
          </div>
          <div>
            <h4 className="text-[#C4A45A] text-[11px] tracking-[.25em] uppercase font-semibold mb-4" style={{ fontFamily: "'Jost',sans-serif" }}>Explore</h4>
            <ul className="space-y-2.5">
              {[["About Us","#about"],["Rooms","#rooms"],["Activities","#activities"],["Gallery","#gallery"],["Contact","#contact"]].map(([l,h]) => (
                <li key={l}><a href={h} className="text-white/45 hover:text-[#C4A45A] text-sm flex items-center gap-1.5 transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}><ChevronRight size={11} className="opacity-50" />{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#C4A45A] text-[11px] tracking-[.25em] uppercase font-semibold mb-4" style={{ fontFamily: "'Jost',sans-serif" }}>Activities</h4>
            <ul className="space-y-2.5">
              {["Cricket","Volleyball","ATV Bike","Snooker","Table Tennis","Pool","Outdoor Gym"].map(a => (
                <li key={a}><a href="#activities" className="text-white/45 hover:text-[#C4A45A] text-sm flex items-center gap-1.5 transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}><ChevronRight size={11} className="opacity-50" />{a}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[#C4A45A] text-[11px] tracking-[.25em] uppercase font-semibold mb-4" style={{ fontFamily: "'Jost',sans-serif" }}>Get in Touch</h4>
            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-2.5"><Phone size={14} className="text-[#C4A45A] mt-0.5 flex-shrink-0" /><span className="text-white/45 text-sm" style={{ fontFamily: "'Jost',sans-serif" }}>{PHONE_DISPLAY}</span></div>
              <div className="flex items-start gap-2.5"><Mail size={14} className="text-[#C4A45A] mt-0.5 flex-shrink-0" /><a href="mailto:sangamaretreat@gmail.com" className="text-white/45 hover:text-[#C4A45A] text-sm transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}>sangamaretreat@gmail.com</a></div>
              <div className="flex items-start gap-2.5"><MapPin size={14} className="text-[#C4A45A] mt-0.5 flex-shrink-0" /><span className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'Jost',sans-serif" }}>{ADDRESS}</span></div>
            </div>
            <div className="flex gap-2.5">
              <a href={`tel:${PHONE}`} className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-[#2D5016] text-white text-xs tracking-widest uppercase hover:bg-[#3d6020] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}><Phone size={12} />Call</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-[#25D366] text-white text-xs tracking-widest uppercase hover:bg-[#20b858] transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}><MessageCircle size={12} />WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs" style={{ fontFamily: "'Jost',sans-serif" }}>
            © {new Date().getFullYear()} Sangama Retreat · sangamaretreat.com
          </p>
          <div className="text-right">
            <a href="https://tantravruksha.in" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-xs transition-colors" style={{ fontFamily: "'Jost',sans-serif" }}><i>Built By -   </i><b><u>tantravruksha.in</u></b></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── MOBILE BAR ───────────────────────────────────────────────────────────────
function MobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#1A2416] border-t border-white/10 flex">
      <a href={`tel:${PHONE}`} className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-white/65 hover:text-[#C4A45A] transition-colors">
        <Phone size={17} /><span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>Call</span>
      </a>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex-[2] flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white font-bold text-xs tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>
        <MessageCircle size={16} /> WhatsApp
      </a>
      <a href="#contact" className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-white/65 hover:text-[#C4A45A] transition-colors">
        <MapPin size={17} /><span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Jost',sans-serif" }}>Find Us</span>
      </a>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden pb-14 md:pb-0">
      <style>{`html{scroll-behavior:smooth}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2D5016}`}</style>
      <Navbar />
      <Hero />

      <About />
      <Rooms />
      <Activities />
      <Gallery />
      <WhyUs />
      <Contact />
      <Footer />
      <MobileBar />
      <FloatingBtns />
    </div>
  );
}
