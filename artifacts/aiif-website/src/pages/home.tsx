import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Cctv,
  Check,
  Clock3,
  GraduationCap,
  Instagram,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CTA, CtaBand, Reveal, useSeo } from "@/components/site";
import { images, industries, org, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";
import logo from "@/assets/aiif-logo.png";
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
  { t: "Site brief", d: "Share your premises, timings, headcount and priority risks." },
  { t: "Ground assessment", d: "Our team maps posts, movement, blind spots and response needs." },
  { t: "Trained deployment", d: "Screened personnel arrive briefed, uniformed and ready for duty." },
  { t: "Active supervision", d: "Regular checks, reporting and round-the-clock escalation support." },
];

const faqs = [
  { q: "Which services does AIIF provide?", a: "Trained security guards, smart surveillance, investigation, staffing and manpower supply, payroll management, and education and training for security professionals." },
  { q: "Is support available outside office hours?", a: "Yes. AIIF provides round-the-clock operational support for deployed guards, workforce teams and client sites." },
  { q: "Can AIIF manage housekeeping and facility staff?", a: "Yes. Our staffing division sources, screens and deploys housekeeping and facility-support personnel, with continuity and replacement support." },
  { q: "How do we get a deployment proposal?", a: "Send your site, location, role and headcount requirements through the enquiry page. The AIIF team will prepare a tailored deployment plan." },
];

const proof = [
  ["24/7", "Operational support"],
  ["06", "Integrated services"],
  ["01", "Accountable partner"],
] as const;

export default function Home() {
  useSeo(pages.home, [organizationSchema, ...servicesSchema]);
  const reduce = useReducedMotion();

  return (
    <>
      <section className="home-hero relative isolate min-h-[760px] overflow-hidden bg-navy-deep text-paper lg:min-h-[calc(100svh-121px)]">
        <motion.img
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={images.heroGuard}
          alt="AIIF security officer deployed at a corporate campus"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,13,31,.98)_0%,rgba(7,21,46,.9)_42%,rgba(7,21,46,.25)_73%,rgba(7,21,46,.12)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1 bg-signal" />

        <div className="mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-between px-5 pb-8 pt-16 sm:px-8 lg:min-h-[calc(100svh-121px)] lg:px-12 lg:pb-10 lg:pt-20">
          <div className="max-w-[860px]">
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="flex items-center gap-3 font-cond text-sm font-semibold uppercase tracking-[0.16em] text-paper/80"
            >
              <span className="h-[2px] w-12 bg-signal" />
              Security · Investigation · Workforce
            </motion.div>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[820px] text-[clamp(4.6rem,10vw,9.8rem)] font-bold uppercase leading-[0.78] tracking-[-0.045em]"
            >
              One force.<br />Every front.
            </motion.h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-8 grid max-w-2xl gap-7 border-l-4 border-signal pl-5 sm:grid-cols-[1fr_auto] sm:items-end sm:pl-7"
            >
              <p className="max-w-xl text-lg leading-relaxed text-paper/80 sm:text-xl">
                Trained guards, smart surveillance and dependable workforce teams—planned and supervised under one command.
              </p>
              <CTA href="/contact" variant="light" testId="button-hero-enquire">Plan a Deployment</CTA>
            </motion.div>
          </div>

          <div className="mt-16 grid border-y border-paper/25 bg-navy-deep/45 backdrop-blur-sm sm:grid-cols-3 lg:ml-auto lg:w-[62%]">
            {proof.map(([value, label]) => (
              <div key={label} className="flex items-center gap-4 border-b border-paper/20 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <span className="font-display text-4xl font-bold text-signal">{value}</span>
                <span className="max-w-24 font-cond text-sm font-semibold uppercase leading-tight tracking-[0.1em] text-paper/80">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <img src={logo} alt="" className="absolute right-5 top-5 h-16 w-16 rounded-full border border-paper/30 shadow-2xl sm:right-8 sm:top-8 lg:h-20 lg:w-20" />
      </section>

      <div className="command-ticker overflow-hidden bg-signal py-3 text-paper">
        <div className="flex w-max animate-marquee font-display text-lg font-semibold uppercase tracking-[0.08em]">
          {[0, 1].map((k) => (
            <div key={k} className="flex" aria-hidden={k === 1}>
              {services.map((service) => (
                <span key={service.id} className="flex items-center gap-7 px-7">
                  {service.name}<span className="h-1.5 w-1.5 rotate-45 bg-brass" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-7 border-b border-navy/20 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <Reveal><span className="section-kicker">Integrated capabilities</span></Reveal>
            <Reveal delay={0.06}>
              <h2 className="max-w-4xl text-5xl font-bold uppercase leading-[0.9] text-navy sm:text-6xl lg:text-[5.8rem]">
                Protection is a system, not a single guard.
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id];
              const wide = index === 0 || index === 3;
              return (
                <Reveal key={service.id} delay={0.04 * index} className={wide ? "xl:col-span-7" : "xl:col-span-5"}>
                  <Link
                    href={`/services?s=${service.id}`}
                    data-testid={`card-service-${service.id}`}
                    className="service-panel group relative block h-[430px] overflow-hidden bg-navy-deep text-paper sm:h-[500px]"
                  >
                    <img src={service.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,13,31,.08)_20%,rgba(4,13,31,.92)_100%)]" />
                    <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center bg-signal">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <span className="font-cond text-sm font-semibold uppercase tracking-[0.14em] text-brass">Capability {service.code}</span>
                      <h3 className="mt-2 max-w-xl text-4xl font-bold uppercase leading-none sm:text-5xl">{service.name}</h3>
                      <div className="mt-5 flex items-end justify-between gap-5 border-t border-paper/25 pt-5">
                        <p className="max-w-lg text-base leading-relaxed text-paper/75">{service.short}</p>
                        <span className="grid h-11 w-11 shrink-0 place-items-center border border-paper/40 transition-colors group-hover:border-signal group-hover:bg-signal">
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-navy-deep text-paper">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[520px] lg:min-h-[760px]" y={0}>
            <img src={images.teamBriefing} alt="AIIF personnel at an operational briefing" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 border-l-4 border-signal bg-navy-deep/85 px-5 py-4 font-display text-2xl font-semibold uppercase backdrop-blur-sm sm:bottom-10 sm:left-10">
              Briefed. Deployed. Accountable.
            </span>
          </Reveal>
          <div className="relative flex items-center px-5 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
            <div className="absolute right-0 top-0 font-display text-[15rem] font-bold leading-none text-paper/[0.025]">A</div>
            <div className="relative max-w-xl">
              <Reveal><span className="section-kicker section-kicker-light">Why AIIF</span></Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-7 text-5xl font-bold uppercase leading-[0.9] sm:text-6xl xl:text-7xl">Built like a force. Run like a partner.</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 text-lg leading-relaxed text-paper/75">AIIF brings guarding, investigation, staffing, payroll and training into one operating structure. Fewer hand-offs. Clearer responsibility. Faster action when your site needs it.</p>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                  {["Screened and trained personnel", "Site-specific post orders", "Workforce continuity support", "One escalation channel"].map((item) => (
                    <li key={item} className="flex items-start gap-3 border-t border-paper/15 pt-4 font-medium">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" />{item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.24}><div className="mt-10"><CTA href="/about" variant="light" testId="button-home-about">Meet AIIF</CTA></div></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <Reveal><span className="section-kicker">Deployment method</span></Reveal>
              <Reveal delay={0.06}><h2 className="mt-7 text-5xl font-bold uppercase leading-[0.9] text-navy sm:text-6xl">From requirement to ready post.</h2></Reveal>
              <Reveal delay={0.12}><p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">A disciplined four-step operating method keeps every deployment clear from day one.</p></Reveal>
              <Reveal delay={0.18}><img src={images.nightPatrol} alt="AIIF officer on an active patrol" loading="lazy" className="mt-10 aspect-[5/4] w-full object-cover" /></Reveal>
            </div>
            <div className="border-t-2 border-navy">
              {steps.map((step, index) => (
                <Reveal key={step.t} delay={0.04 * index}>
                  <div className="group grid grid-cols-[56px_1fr] gap-4 border-b border-navy/20 py-7 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:py-9">
                    <span className="font-display text-3xl font-bold text-signal">0{index + 1}</span>
                    <div>
                      <h3 className="text-3xl font-bold uppercase text-navy sm:text-4xl">{step.t}</h3>
                      <p className="mt-2 max-w-xl text-muted-foreground">{step.d}</p>
                    </div>
                    <ArrowRight className="hidden h-6 w-6 text-navy/35 transition-transform group-hover:translate-x-2 sm:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8e5de] py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 border-b border-navy/20 pb-9 md:flex-row md:items-end md:justify-between">
            <div>
              <Reveal><span className="section-kicker">Operational sectors</span></Reveal>
              <Reveal delay={0.06}><h2 className="mt-7 text-5xl font-bold uppercase leading-[0.9] text-navy sm:text-6xl">Ready for the environments you run.</h2></Reveal>
            </div>
            <Reveal><CTA href="/industries" variant="ghost" testId="button-home-industries">Explore Sectors</CTA></Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <Reveal key={industry.id} delay={0.035 * index}>
                <Link href={`/industries#${industry.id}`} data-testid={`link-industry-${industry.id}`} className="group block min-h-64 border-b border-navy/20 p-7 transition-colors hover:bg-navy hover:text-paper md:border-r lg:p-9">
                  <span className="font-display text-4xl font-bold text-signal">0{index + 1}</span>
                  <h3 className="mt-10 text-3xl font-bold uppercase leading-none text-navy transition-colors group-hover:text-paper">{industry.name}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground transition-colors group-hover:text-paper/70">{industry.challenge}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal><span className="section-kicker">The force in view</span></Reveal>
              <Reveal delay={0.06}><h2 className="mt-7 text-5xl font-bold uppercase leading-[0.9] text-navy sm:text-6xl">People, training and operations.</h2></Reveal>
              <Reveal delay={0.12}><p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">A closer look at the teams and systems behind every AIIF deployment.</p></Reveal>
              <Reveal delay={0.18}>
                <a href={org.instagram} target="_blank" rel="noreferrer" data-testid="link-home-instagram" className="mt-8 inline-flex items-center gap-3 border-b-2 border-signal pb-2 font-cond font-semibold uppercase tracking-[0.12em] text-navy hover:text-signal">
                  <Instagram className="h-4 w-4" /> Follow @{org.handle}
                </a>
              </Reveal>
              <Reveal delay={0.2}><img src={instaGrid} alt="Recent AIIF updates" loading="lazy" className="mt-10 w-full border border-navy/15" /></Reveal>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7">
              <Reveal className="col-span-2"><img src={images.training} alt="AIIF security training in progress" loading="lazy" className="aspect-[16/8] w-full object-cover" /></Reveal>
              <Reveal delay={0.06}><img src={images.investigation} alt="AIIF investigation professional reviewing evidence" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
              <Reveal delay={0.12}><img src={images.staffing} alt="AIIF workforce professional managing operations" loading="lazy" className="aspect-[4/5] w-full object-cover" /></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-paper md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <Reveal><span className="section-kicker section-kicker-light">Deployment desk</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-7 text-5xl font-bold uppercase leading-[0.9] sm:text-6xl">Answers before your team takes post.</h2></Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 flex items-center gap-4 border-l-4 border-signal pl-5">
                <Clock3 className="h-8 w-8 text-signal" />
                <div><span className="block font-display text-2xl font-bold uppercase">24/7 support</span><span className="text-paper/60">An active escalation line, not just office hours.</span></div>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <Accordion type="single" collapsible defaultValue="q0" className="border-t border-paper/25">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`q${index}`} className="border-b border-paper/20">
                  <AccordionTrigger data-testid={`button-faq-${index}`} className="py-6 text-left font-display text-xl font-semibold uppercase text-paper hover:text-signal hover:no-underline sm:text-2xl">{faq.q}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-7 text-base leading-relaxed text-paper/65">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
