import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Clock3, Instagram, Menu, X } from "lucide-react";
import { org, services, type PageMeta } from "@/data/site";
import aiifLogo from "@/assets/aiif-logo.png";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

function setMeta(attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = content;
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
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.page = "1";
    script.text = ld;
    document.head.appendChild(script);
    return () => script.remove();
  }, [meta.title, meta.description, meta.path, ld]);
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  void delay;
  return <div className={className}>{children}</div>;
}

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean; size?: number }) {
  return (
    <span className="flex min-w-0 items-center gap-3.5" translate="no">
      <img src={aiifLogo} alt="" width="166" height="166" fetchPriority="high" decoding="sync" className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
      <span className={compact ? "hidden sm:block" : "block"}>
        <span className={`block text-[1.18rem] font-semibold leading-none tracking-[0.06em] ${light ? "text-white" : "text-navy-deep"}`}>Alliance International</span>
        <span className={`mt-1 block max-w-[210px] text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.16em] ${light ? "text-white/70" : "text-slate-500"}`}>Integrated Force</span>
      </span>
    </span>
  );
}

export function CTA({ href, children, variant = "primary", testId }: { href: string; children: ReactNode; variant?: "primary" | "navy" | "ghost" | "light"; testId: string }) {
  const styles = {
    primary: "bg-signal text-white hover:bg-[#1649bc]",
    navy: "bg-navy text-white hover:bg-navy-deep",
    ghost: "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white",
    light: "border border-white/65 text-white hover:bg-white hover:text-navy-deep",
  }[variant];
  return (
    <Link href={href} data-testid={testId} className={`group inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-sm font-semibold transition-[background-color,color,border-color] ${styles}`}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-slate-700 shadow-[0_1px_0_rgba(15,23,42,.04)]">
      <div className="mx-auto flex h-[88px] max-w-[1530px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
        <Link href="/" data-testid="link-logo" aria-label="AIIF home" className="shrink-0"><Logo compact /></Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`} className={`relative px-5 py-3 text-[0.88rem] font-medium transition-colors ${active ? "text-signal" : "text-slate-500 hover:text-navy"}`}>
                {item.label}
                {active && <span className="absolute inset-x-5 -bottom-[21px] h-0.5 bg-signal" />}
              </Link>
            );
          })}
        </nav>
        <a href={org.instagram} target="_blank" rel="noreferrer" aria-label="AIIF on Instagram" className="hidden h-11 w-11 place-items-center border border-slate-200 text-slate-500 transition-colors hover:border-navy hover:text-navy lg:grid">
          <Instagram aria-hidden="true" className="h-4 w-4" />
        </a>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-12 w-12 shrink-0 place-items-center border border-slate-300 text-navy lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <nav className="hidden border-t border-slate-200 lg:block" aria-label="Service navigation">
        <div className="mx-auto grid max-w-[1530px] grid-cols-6 px-12">
          {services.map((service) => (
            <Link key={service.id} href={`/services?s=${service.id}`} className="flex min-h-16 items-center justify-center border-r border-slate-200 px-4 text-center text-xs font-semibold leading-snug text-slate-800 first:border-l hover:bg-slate-50 hover:text-signal">
              {service.name}
            </Link>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mobile-drawer fixed inset-x-0 bottom-0 top-[89px] overflow-y-auto bg-white lg:hidden">
            <nav className="px-5 py-5" aria-label="Mobile navigation">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className={`flex min-h-14 items-center justify-between border-b border-slate-200 text-xl font-medium ${location === item.href ? "text-signal" : "text-navy-deep"}`}>
                  {item.label}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              ))}
              <p className="mt-8 text-xs font-semibold text-signal">Services</p>
              <div className="mt-2 grid gap-1">
                {services.map((service) => <Link key={service.id} href={`/services?s=${service.id}`} className="py-2 text-sm text-slate-600 hover:text-navy">{service.name}</Link>)}
              </div>
              <div className="mt-8"><CTA href="/contact" testId="button-mobile-quote">Request a Proposal</CTA></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#26394d] text-white/75">
      <div className="mx-auto max-w-[1530px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-6">Integrated security, investigation, workforce, payroll and training support for organisations across India.</p>
            <p className="mt-5 max-w-sm text-xs leading-5 text-white/55">Registered office: {org.registeredOffice}</p>
            <p className="mt-2 text-xs text-white/55">CIN: {org.cin}</p>
            <p className="mt-6 flex items-center gap-2 text-sm text-white"><Clock3 aria-hidden="true" className="h-4 w-4 text-signal" /> 24/7 operational support</p>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">{NAV.map((item) => <li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold text-white">Services</h2>
            <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">{services.map((service) => <li key={service.id}><Link href={`/services?s=${service.id}`} className="hover:text-white">{service.name}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-white">Connect</h2>
            <a href={org.instagram} target="_blank" rel="noreferrer" className="mt-5 flex items-center gap-2 text-sm hover:text-white"><Instagram aria-hidden="true" className="h-4 w-4" /> @{org.handle}</a>
            <div className="mt-7"><CTA href="/contact" variant="light" testId="button-footer-contact">Get in Touch</CTA></div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {org.legalName}</span>
          <span>Security · Investigation · Education</span>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.search && !window.location.hash) window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:bg-navy focus:px-4 focus:py-3 focus:text-white">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, image, imageFocus = "center" }: { eyebrow: string; title: ReactNode; intro: string; image: string; imageFocus?: "center" | "top" }) {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-navy-deep text-white md:min-h-[620px]">
      <img src={image} alt="" width="1536" height="1024" fetchPriority="high" className={`absolute inset-0 h-full w-full object-cover ${imageFocus === "top" ? "object-top" : "object-center"}`} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,22,33,.92)_0%,rgba(4,22,33,.72)_42%,rgba(4,22,33,.1)_78%)]" />
      <div className="relative mx-auto flex min-h-[520px] max-w-[1530px] items-end px-5 pb-16 sm:px-8 md:min-h-[620px] md:pb-20 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-signal">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-[2.5rem] font-semibold leading-[1.02] md:text-7xl">{title}</h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-7 text-white/80">{intro}</p>
          <a href="#page-content" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold hover:text-signal"><span className="grid h-9 w-9 place-items-center rounded-full border border-signal text-signal"><ArrowDown aria-hidden="true" className="h-4 w-4" /></span> Explore this page</a>
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-[#edf2f7]">
      <div className="mx-auto flex max-w-[1530px] flex-col gap-7 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <p className="section-label">Start a conversation</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold text-navy-deep md:text-5xl">Plan the right team for your site.</h2>
        </div>
        <CTA href="/contact" variant="navy" testId="button-band-enquire">Request a Proposal</CTA>
      </div>
    </section>
  );
}
