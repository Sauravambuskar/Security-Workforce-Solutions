import { ShieldCheck, Search, GraduationCap, Eye, Handshake, Scale } from "lucide-react";
import { CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, org, organizationSchema, pages } from "@/data/site";
import logo from "@/assets/aiif-logo.png";
import instaRef from "@/assets/instagram-ref.png";

const pillars = [
  { icon: ShieldCheck, t: "Security", d: "Trained guards and smart surveillance protecting premises, people and assets." },
  { icon: Search, t: "Investigation", d: "Discreet fact-finding that helps clients make informed decisions." },
  { icon: GraduationCap, t: "Education", d: "Training that builds discipline, judgement and professionalism." },
];

const values = [
  { icon: Eye, t: "Alertness", d: "Watchful on every post, every shift, including the quiet hours." },
  { icon: Scale, t: "Discipline", d: "Clear post orders, grooming and conduct standards." },
  { icon: Handshake, t: "Accountability", d: "One partner answerable for security, staffing and payroll." },
];

export default function About() {
  useSeo(pages.about, [organizationSchema]);
  return (
    <>
      <PageHero eyebrow="About the company" title={<>A force built on <span className="text-signal">alliance</span></>} intro={`${org.legalName} is an Indian security and workforce company focused on security, investigation and education, with trained guards, smart technology and 24/7 support.`} image={images.teamBriefing} />

      <section className="mx-auto max-w-7xl px-5 py-24 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7">
          <Reveal><span className="eyebrow">Who we are</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase text-navy leading-none">The name says it plainly.</h2></Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p><strong className="text-navy">Alliance</strong> because security works best as a partnership with the client. <strong className="text-navy">International</strong> because we hold ourselves to global standards. <strong className="text-navy">Integrated</strong> because guarding, surveillance, staffing and payroll should not be four separate headaches. <strong className="text-navy">Force</strong> because discipline is not optional.</p>
              <p>The company's public profile also describes AIIF as the home of @ioemsltd.</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-5 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-signal/10 scale-125" />
            <img src={logo} alt="AIIF logo" className="relative h-64 w-64 rounded-full shadow-2xl ring-8 ring-paper" />
          </div>
        </Reveal>
      </section>

      <section className="bg-navy-deep text-paper relative overflow-hidden">
        <div className="chevrons absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-24">
          <Reveal><span className="eyebrow">Three pillars</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-6xl font-bold uppercase leading-none">Security. Investigation. Education.</h2></Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-px bg-paper/10">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={0.08 * i} className="bg-navy-deep p-8 h-full">
                <p.icon className="h-8 w-8 text-signal" />
                <h3 className="mt-5 text-3xl uppercase">{p.t}</h3>
                <p className="mt-3 text-paper/70 leading-relaxed">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal><img src={images.training} alt="AIIF training session" loading="lazy" className="rounded-sm aspect-[4/3] object-cover w-full shadow-xl" /></Reveal>
        <div>
          <Reveal><span className="eyebrow">What we value</span></Reveal>
          <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-5xl font-bold uppercase text-navy leading-none">Standards you can see at the gate</h2></Reveal>
          <div className="mt-8 space-y-6">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={0.08 * i} className="flex gap-5">
                <span className="h-12 w-12 shrink-0 grid place-items-center rounded-full bg-navy text-paper"><v.icon className="h-5 w-5" /></span>
                <div><h3 className="text-xl uppercase text-navy">{v.t}</h3><p className="text-muted-foreground">{v.d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent/60 py-24">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal><span className="eyebrow">Brand continuity</span></Reveal>
            <Reveal delay={0.06}><h2 className="mt-4 text-4xl md:text-5xl font-bold uppercase text-navy leading-none">The same identity, from feed to front gate</h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-lg text-muted-foreground max-w-xl">This site carries forward the red-and-navy AIIF mark and the condensed, uniform-like headings used across the company's Instagram, so clients recognise the brand wherever they meet it.</p></Reveal>
          </div>
          <Reveal className="lg:col-span-5 flex justify-center"><img src={instaRef} alt="AIIF Instagram profile screenshot" loading="lazy" className="w-56 rounded-2xl shadow-2xl ring-4 ring-paper" /></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
