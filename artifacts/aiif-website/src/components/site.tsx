import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ArrowUpRight, Instagram, Clock } from "lucide-react";
import logo from "@/assets/aiif-logo.png";
import { org, services, type PageMeta } from "@/data/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

/* ---------- SEO ---------- */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

export function useSeo(meta: PageMeta, jsonLd: object[]) {
  const ld = JSON.stringify(jsonLd);
  useEffect(() => {
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", window.location.origin + meta.path);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.dataset.page = "1";
    s.text = ld;
    document.head.appendChild(s);
    return () => s.remove();
  }, [meta.title, meta.description, meta.path, ld]);
}

/* ---------- Motion ---------- */
export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Logo({ size = 44, light = false }: { size?: number; light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img src={logo} alt="AIIF logo" width={size} height={size} className="rounded-full shrink-0 ring-1 ring-black/10" style={{ width: size, height: size }} />
      <span className="leading-none">
        <span className={`block font-display font-bold text-[1.35rem] tracking-wide ${light ? "text-paper" : "text-navy"}`}>AIIF</span>
        <span className={`block font-cond text-[0.62rem] uppercase tracking-[0.18em] mt-1 ${light ? "text-paper/70" : "text-muted-foreground"}`}>Alliance International Integrated Force</span>
      </span>
    </span>
  );
}

export function CTA({ href, children, variant = "red", testId }: { href: string; children: ReactNode; variant?: "red" | "navy" | "ghost" | "light"; testId: string }) {
  const styles = {
    red: "bg-signal text-paper hover:bg-[hsl(356_80%_40%)]",
    navy: "bg-navy text-paper hover:bg-navy-deep",
    ghost: "border border-navy/25 text-navy hover:border-navy hover:bg-navy/5",
    light: "border border-paper/40 text-paper hover:bg-paper hover:text-navy",
  }[variant];
  return (
    <Link href={href} data-testid={testId} className={`group inline-flex items-center gap-3 px-6 py-3.5 font-cond font-semibold uppercase tracking-[0.12em] text-[0.95rem] rounded-sm transition-colors duration-300 ${styles}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------- Header ---------- */
function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-background"}`}>
      <div className="bg-navy-deep text-paper/80 text-[0.8rem] font-cond tracking-[0.14em] uppercase">
        <div className="mx-auto max-w-7xl px-5 h-9 flex items-center justify-between">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-signal pulse-dot" /> 24/7 Support</span>
          <span className="hidden sm:block">{org.lines.join("  /  ")}</span>
          <a href={org.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-paper" data-testid="link-instagram-top"><Instagram className="h-3.5 w-3.5" /> @{org.handle}</a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 h-[76px] flex items-center justify-between">
        <Link href="/" data-testid="link-logo" aria-label="AIIF home"><Logo /></Link>
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV.map((n) => {
            const active = location === n.href;
            return (
              <Link key={n.href} href={n.href} data-testid={`link-nav-${n.label.toLowerCase()}`} className={`relative px-4 py-2 font-cond font-semibold uppercase tracking-[0.14em] text-[0.92rem] transition-colors ${active ? "text-signal" : "text-navy hover:text-signal"}`}>
                {n.label}
                {active && <motion.span layoutId="nav-underline" className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-signal" />}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block"><CTA href="/contact" testId="button-header-quote">Request a Proposal</CTA></div>
        <button onClick={() => setOpen((v) => !v)} className="lg:hidden h-11 w-11 grid place-items-center rounded-sm bg-navy text-paper" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div className="stripe-rule" />
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="lg:hidden fixed inset-x-0 top-[121px] bottom-0 bg-navy-deep text-paper chevrons overflow-y-auto">
            <nav className="px-6 py-8 flex flex-col" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={n.href} data-testid={`link-mobile-${n.label.toLowerCase()}`} className={`flex items-center justify-between py-4 border-b border-paper/10 font-display text-3xl uppercase ${location === n.href ? "text-signal" : ""}`}>
                    {n.label} <ArrowUpRight className="h-5 w-5 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8"><CTA href="/contact" testId="button-mobile-quote">Request a Proposal</CTA></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-navy-deep text-paper/75 relative overflow-hidden">
      <div className="chevrons absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light size={56} />
            <p className="mt-6 max-w-sm leading-relaxed">{org.legalName}. {org.pillars.join(", ")}. Home of @ioemsltd.</p>
            <p className="mt-4 font-display text-paper text-2xl uppercase tracking-wide">{org.tagline}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-cond uppercase tracking-[0.2em] text-sm text-paper mb-4">Company</h4>
            <ul className="space-y-2.5">{NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-paper" data-testid={`link-footer-${n.label.toLowerCase()}`}>{n.label}</Link></li>)}</ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-cond uppercase tracking-[0.2em] text-sm text-paper mb-4">Services</h4>
            <ul className="space-y-2.5">{services.map((s) => <li key={s.id}><Link href={`/services?s=${s.id}`} className="hover:text-paper" data-testid={`link-footer-service-${s.id}`}>{s.name}</Link></li>)}</ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-cond uppercase tracking-[0.2em] text-sm text-paper mb-4">Reach</h4>
            <a href={org.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-paper" data-testid="link-footer-instagram"><Instagram className="h-4 w-4" /> Instagram</a>
            <p className="mt-3 flex items-center gap-2"><Clock className="h-4 w-4" /> 24/7 Support</p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-paper/10 flex flex-col sm:flex-row gap-3 justify-between text-sm">
          <span>&copy; {new Date().getFullYear()} {org.legalName}</span>
          <span className="text-paper/50">Client presentation build. Contact details to be confirmed by AIIF.</span>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.search) window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <div className="grain min-h-[100dvh] flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:m-3 focus:p-3 focus:bg-navy focus:text-paper">Skip to content</a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

/* ---------- Shared blocks ---------- */
export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: ReactNode; intro: string; image: string }) {
  return (
    <section className="relative bg-navy-deep text-paper overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-32">
        <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
        <Reveal delay={0.08}><h1 className="mt-5 text-5xl md:text-7xl font-bold uppercase leading-[0.95] max-w-4xl">{title}</h1></Reveal>
        <Reveal delay={0.16}><p className="mt-6 max-w-2xl text-lg text-paper/80 leading-relaxed">{intro}</p></Reveal>
      </div>
      <div className="stripe-rule relative" />
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-signal text-paper relative overflow-hidden">
      <div className="chevrons absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none">Need a secure site by next shift?</h2>
          <p className="mt-3 text-paper/85 text-lg">Tell us about your premises. We will come back with a deployment plan.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <CTA href="/contact" variant="navy" testId="button-band-enquire">Send an Enquiry</CTA>
          <CTA href="/services" variant="light" testId="button-band-services">View Services</CTA>
        </div>
      </div>
    </section>
  );
}
