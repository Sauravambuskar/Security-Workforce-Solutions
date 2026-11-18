import { Eye, GraduationCap, Handshake, Plus, Search, ShieldCheck } from "lucide-react";
import { CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, org, organizationSchema, pages } from "@/data/site";

const methodology = [
  "Understand the task through site research and risk assessment.",
  "Design services around the client's actual operating environment.",
  "Build the most suitable team for the assignment.",
  "Deploy with clear responsibilities and reporting lines.",
  "Evaluate performance and adapt as requirements change.",
];

const standards = [
  { icon: ShieldCheck, title: "Security", text: "Trained personnel and surveillance systems protecting premises, people and assets." },
  { icon: Search, title: "Investigation", text: "Discreet, fact-based support that helps clients make informed decisions." },
  { icon: GraduationCap, title: "Education", text: "Practical training that develops judgement, communication and professional conduct." },
];

const values = [
  { icon: Eye, title: "Our Mission", text: "Deliver dependable, professional and accountable security and workforce services." },
  { icon: Handshake, title: "Our Vision", text: "Become the most trusted integrated service partner for organisations across India." },
  { icon: ShieldCheck, title: "Our Values", text: "Discipline · Integrity · Alertness · Quality · Partnership" },
];

export default function About() {
  useSeo(pages.about, [organizationSchema]);
  return (
    <>
      <PageHero eyebrow="About AIIF" title={<>A partnership built around protection.</>} intro={`${org.legalName} brings security, investigation, workforce services and professional training together under one accountable operating structure.`} image={images.indianSecurityTeam} />

      <section id="page-content" className="bg-[#f3f4f5] py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">About Us</p></Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal><h2 className="text-4xl font-normal text-navy-deep md:text-5xl">Alliance International Integrated Force</h2></Reveal>
              <Reveal delay={0.05}><img src={images.indianSecurityTeam} alt="AIIF security personnel assembled as one team" width="1351" height="1088" loading="lazy" className="mt-8 aspect-[4/3] w-full object-cover" /></Reveal>
            </div>
            <Reveal delay={0.08} className="flex flex-col justify-end space-y-5 text-base leading-7 text-slate-600">
              <p><strong className="font-semibold text-navy-deep">Alliance</strong> reflects the partnership we build with every client. <strong className="font-semibold text-navy-deep">Integrated</strong> reflects a model where guarding, surveillance, staffing, payroll and training work together instead of operating as separate services.</p>
              <p>Every assignment begins with the site: its people, movement, risks, hours and expectations. We turn that understanding into post orders, staffing plans, monitoring routines and escalation paths.</p>
              <p>Our objective is straightforward—place the right people in the right roles, support them with clear systems and remain accountable throughout the engagement.</p>
              <div className="border-l-2 border-signal pl-5 text-sm leading-6 text-slate-500">
                <p><strong className="text-navy-deep">CIN:</strong> {org.cin}</p>
                <p><strong className="text-navy-deep">Incorporated:</strong> {org.incorporatedOn}</p>
                <p><strong className="text-navy-deep">Registered office:</strong> {org.registeredOffice}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">How We Get It Done</p></Reveal>
          <div className="mt-10 grid lg:grid-cols-2">
            <Reveal><img src={images.tacticalGuards} alt="AIIF security team prepared for a site assignment" width="1599" height="1066" loading="lazy" className="h-full min-h-[450px] w-full object-cover" /></Reveal>
            <Reveal delay={0.05} className="bg-signal p-7 text-white sm:p-10 lg:p-14">
              <h2 className="text-3xl font-semibold">Our Methodology</h2>
              <ul className="mt-8 space-y-5">
                {methodology.map((item) => <li key={item} className="flex gap-4 border-b border-white/20 pb-4 text-sm font-semibold leading-6 last:border-b-0"><Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />{item}</li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f5] py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">Our Capabilities</p></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {standards.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index} className="h-full">
                <article className="h-full bg-white p-8">
                  <item.icon aria-hidden="true" className="h-11 w-11 stroke-[1.5] text-signal" />
                  <h3 className="mt-8 text-2xl font-semibold text-navy-deep">{item.title}</h3>
                  <p className="mt-4 leading-6 text-slate-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-[1530px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12">
          <Reveal>
            <img
              src={images.recruitmentPoster}
              alt="AIIF security team recruitment announcement"
              width="965"
              height="1280"
              loading="lazy"
              className="mx-auto max-h-[720px] w-full max-w-[540px] object-contain"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-sm font-semibold text-blue-300">Careers at AIIF</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">Join a team built on discipline and responsibility.</h2>
            <p className="mt-6 max-w-xl text-lg leading-7 text-white/75">AIIF recruits security and support professionals for client sites. Opening details, eligibility and joining instructions are shared through the company&apos;s official public channel.</p>
            <a href={org.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center justify-center bg-signal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1649bc]" data-testid="link-careers-instagram">View Current Updates</a>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">What We Stand For</p></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((item, index) => (
              <Reveal key={item.title} delay={0.04 * index} className="h-full">
                <article className="min-h-64 bg-[#f3f4f5] p-8">
                  <item.icon aria-hidden="true" className="ml-auto h-12 w-12 stroke-[1.4] text-navy" />
                  <h3 className="mt-9 text-2xl font-semibold text-navy-deep">{item.title}</h3>
                  <p className="mt-4 leading-6 text-slate-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
