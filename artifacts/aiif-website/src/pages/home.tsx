import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Cctv, Search, Users, Wallet, GraduationCap, Clock, ArrowRight, Instagram, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CTA, CtaBand, Reveal, useSeo } from "@/components/site";
import { images, industries, org, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";
import logo from "@/assets/aiif-logo.png";
import instaRef from "@/assets/instagram-ref.png";
import instaGrid from "@/assets/insta-grid.jpg";

export const serviceIcons: Record<ServiceId, typeof ShieldCheck> = {
  "manned-guarding": ShieldCheck,
  surveillance: Cctv,
  investigation: Search,
  staffing: Users,
  payroll: Wallet,
  training: GraduationCap,
};

const steps = [
  { t: "Tell us your site", d: "Share the premises, timings and concerns." },
  { t: "We assess", d: "A walk-through to map posts and risks." },
  { t: "We deploy", d: "Briefed, uniformed personnel take post." },
  { t: "We stay on call", d: "Supervision and support around the clock." },
];

const faqs = [
  { q: "Which services does AIIF provide?", a: "Trained security guards, smart surveillance, investigation, staffing and manpower supply, payroll management, and education and training for security professionals." },
  { q: "Is support available outside office hours?", a: "Yes. AIIF positions itself on round-the-clock support: trained guards, smart technology and 24/7 support." },
  { q: "Can one agency handle both guarding and our contract workforce?", a: "That is the point of an integrated force. Security, staffing and payroll can be planned together so one partner is accountable." },
  { q: "How do we get a proposal?", a: "Use the enquiry page to describe your site and requirement. The AIIF team will follow up with a tailored plan." },
];

export default function Home() {
  useSeo(pages.home, [organizationSchema, ...servicesSchema]);
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-paper">
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-navy/[0.04]" />
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-10 items-center pt-12 pb-16 lg:py-20">
          <div className="lg:col-span-6 relative z-10">
            <Reveal><span className="inline-flex items-center gap-2 border border-navy/15 bg-card px-3 py-1.5 rounded-sm font-cond uppercase tracking-[0.18em] text-xs text-navy">{org.pillars.join("  /  ")}</span></Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[3.2rem] sm:text-7xl xl:text-[5.6rem] font-bold uppercase leading-[0.92] text-navy">
                Trained guards.<br />Smart tech.<br /><span className="text-signal">24/7 support.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {org.legalName} brings security, investigation, staffing, payroll and training under one disciplined command, so your premises and people are covered by a single accountable partner.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <CTA href="/contact" testId="button-hero-enquire">Request a Proposal</CTA>
                <CTA href="/services" variant="ghost" testId="button-hero-services">Explore Services</CTA>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <ul className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-navy/10 pt-6">
                {[["24/7", "Support"], ["Trained", "Personnel"], ["Smart", "Surveillance"], ["One", "Partner"]].map(([a, b]) => (
                  <li key={a}><span className="block font-display text-2xl text-navy">{a}</span><span className="font-cond uppercase tracking-[0.14em] text-xs text-muted-foreground">{b}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-6 relative">
            <motion.div style={{ y: imgY }} className="relative aspect-[4/5] sm:aspect-[5/5] lg:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <motion.img initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} src={images.heroGuard} alt="AIIF security officer in navy uniform at a campus gate" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent" />
              <div className="absolute top-0 left-0 h-full w-2 bg-signal" />
            </motion.div>
            <motion.div initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="absolute -bottom-6 left-4 sm:-left-8 bg-navy text-paper p-5 pr-8 rounded-sm shadow-xl flex items-center gap-4 max-w-[300px]">
              <span className="h-12 w-12 grid place-items-center rounded-full bg-signal shrink-0"><Clock className="h-6 w-6" /></span>
              <span><span className="block font-display text-xl uppercase">Round the clock</span><span className="text-sm text-paper/70">Support whenever your site needs it.</span></span>
            </motion.div>
            <img src={logo} alt="" className="absolute -top-5 right-5 h-20 w-20 rounded-full shadow-xl ring-4 ring-paper" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-navy text-paper overflow-hidden py-4 border-y-4 border-signal">
        <div className="flex w-max animate-marquee font-display uppercase text-xl tracking-wide">
          {[0, 1].map((k) => (
            <div key={k} className="flex" aria-hidden={k === 1}>
              {services.map((s) => <span key={s.id} className="px-8 flex items-center gap-8">{s.name}<span className="h-2 w-2 rotate-45 bg-signal" /></span>)}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><span className="eyebrow">Our Services</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy leading-none">One integrated force. <span className="text-signal">Six disciplines.</span></h2></Reveal>
          <Reveal delay={0.12}><p className="mt-5 text-muted-foreground text-lg">From the gate post to the payslip, every service is planned to work with the others.</p></Reveal>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <Reveal key={s.id} delay={0.05 * i}>
                <Link href={`/services?s=${s.id}`} data-testid={`card-service-${s.id}`} className="group flex h-full bg-card border border-card-border rounded-sm overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex-1 p-6 flex flex-col">
                    <span className="h-11 w-11 grid place-items-center rounded-full bg-navy text-paper transition-colors group-hover:bg-signal"><Icon className="h-5 w-5" /></span>
                    <h3 className="mt-4 text-xl uppercase text-navy">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.14em] text-xs text-signal font-semibold">Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                  <div className="w-[38%] overflow-hidden"><img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="bg-accent/60 py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5 relative">
            <div className="absolute -inset-6 rounded-full bg-navy/10 -z-0" />
            <img src={images.teamBriefing} alt="AIIF guards at a morning briefing" loading="lazy" className="relative rounded-sm aspect-[4/5] object-cover w-full shadow-xl" />
            <div className="absolute -right-4 bottom-10 bg-signal text-paper px-5 py-4 rounded-sm shadow-lg font-display uppercase text-lg leading-tight">Disciplined<br />by design</div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">About AIIF</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy leading-none">Your local security partner, <span className="text-signal">built like a force.</span></h2></Reveal>
            <Reveal delay={0.12}><p className="mt-6 text-lg text-muted-foreground leading-relaxed">AIIF describes itself in three words: security, investigation, education. We train the people we deploy, back them with smart technology, and keep a line open around the clock. It is a simple promise, and we hold ourselves to it every shift.</p></Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {["Trained, uniformed personnel", "Surveillance alongside guarding", "Staffing and payroll in-house", "Training and education wing"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-navy font-medium"><span className="h-6 w-6 grid place-items-center rounded-full bg-signal/10 text-signal"><Check className="h-4 w-4" /></span>{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.24}><div className="mt-10"><CTA href="/about" variant="navy" testId="button-home-about">About the Company</CTA></div></Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="text-center"><Reveal><span className="eyebrow">How it works</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy">Four steps to a <span className="text-signal">covered site</span></h2></Reveal></div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] border-t-2 border-dashed border-navy/20" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={0.08 * i} className="relative text-center">
              <span className="relative mx-auto h-16 w-16 grid place-items-center rounded-full bg-navy text-paper font-display text-2xl ring-8 ring-background">0{i + 1}</span>
              <h3 className="mt-5 text-xl uppercase text-navy">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="bg-navy-deep text-paper relative overflow-hidden">
        <div className="chevrons absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <Reveal><span className="eyebrow">Why AIIF</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase leading-none">The AIIF <span className="text-signal">difference</span></h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-paper/75 text-lg max-w-lg">The discipline of a uniformed force with the flexibility of a service business.</p></Reveal>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[[Clock, "24/7 support"], [ShieldCheck, "Trained guards"], [Cctv, "Smart tech"], [Search, "Investigation"], [Users, "Manpower"], [GraduationCap, "Education"]].map(([I, l], i) => {
                const Ico = I as typeof Clock;
                return (
                  <Reveal key={l as string} delay={0.05 * i} className="border-l-2 border-signal pl-4">
                    <Ico className="h-6 w-6 text-signal" />
                    <span className="mt-2 block font-cond uppercase tracking-[0.12em] font-semibold">{l as string}</span>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <Reveal className="relative">
            <img src={images.nightPatrol} alt="AIIF guard on night patrol" loading="lazy" className="rounded-sm aspect-[5/4] w-full object-cover shadow-2xl" />
            <span className="absolute -top-5 -right-3 sm:right-6 bg-paper text-navy font-display uppercase px-5 py-3 rounded-sm shadow-xl rotate-[-3deg]">Your safety, our commitment</span>
          </Reveal>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div><Reveal><span className="eyebrow">Sectors</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy leading-none">Where we stand guard</h2></Reveal></div>
          <Reveal><CTA href="/industries" variant="ghost" testId="button-home-industries">All Industries</CTA></Reveal>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {industries.map((ind, i) => (
            <Reveal key={ind.id} delay={0.04 * i}>
              <Link href={`/industries#${ind.id}`} data-testid={`link-industry-${ind.id}`} className="group block h-full border-r border-b border-border p-7 hover:bg-navy transition-colors duration-300">
                <span className="font-cond text-sm text-signal tracking-[0.2em]">0{i + 1}</span>
                <h3 className="mt-2 text-2xl uppercase text-navy group-hover:text-paper transition-colors">{ind.name}</h3>
                <p className="mt-2 text-muted-foreground group-hover:text-paper/70 transition-colors">{ind.challenge}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-accent/60 py-24">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <Reveal><span className="eyebrow">On the record</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy leading-none">Follow the force <span className="text-signal">@{org.handle}</span></h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-lg text-muted-foreground max-w-lg">Hiring calls, response readiness, national days and the people behind the uniform. The website carries the same red, navy and white identity you already see on the feed.</p></Reveal>
            <Reveal delay={0.18}><a href={org.instagram} target="_blank" rel="noreferrer" data-testid="link-home-instagram" className="mt-8 inline-flex items-center gap-3 px-6 py-3.5 bg-navy text-paper rounded-sm font-cond uppercase tracking-[0.12em] font-semibold hover:bg-signal transition-colors"><Instagram className="h-4 w-4" /> Visit Instagram</a></Reveal>
          </div>
          <Reveal className="lg:col-span-6 relative flex justify-center">
            <img src={instaGrid} alt="Recent AIIF Instagram posts" loading="lazy" className="w-full max-w-lg rounded-sm shadow-xl" />
            <img src={instaRef} alt="AIIF Instagram profile" loading="lazy" className="hidden sm:block absolute -bottom-10 -right-2 w-40 rounded-xl shadow-2xl ring-4 ring-paper rotate-3" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal><span className="eyebrow">FAQ</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-5xl font-bold uppercase text-navy leading-none">Questions before you deploy?</h2></Reveal>
          <Reveal delay={0.12}><img src={images.surveillance} alt="Surveillance control room" loading="lazy" className="mt-8 rounded-sm aspect-[16/10] object-cover w-full" /></Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="q0" className="border-t border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`} className="border-b border-border">
                <AccordionTrigger data-testid={`button-faq-${i}`} className="py-6 text-left font-display uppercase text-xl text-navy hover:no-underline hover:text-signal">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-6 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
