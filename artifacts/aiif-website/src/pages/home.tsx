import { Link } from "wouter";
import { ArrowDown, Cctv, GraduationCap, Handshake, Plus, Search, ShieldCheck, Users, Wallet, Eye } from "lucide-react";
import { CTA, CtaBand, Reveal, useSeo } from "@/components/site";
import { images, industries, org, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";

export const serviceIcons: Record<ServiceId, typeof ShieldCheck> = {
  "manned-guarding": ShieldCheck,
  surveillance: Cctv,
  investigation: Search,
  staffing: Users,
  payroll: Wallet,
  training: GraduationCap,
};

const method = [
  "Understand the site through a detailed operational assessment.",
  "Build post orders and a workforce plan around actual risks.",
  "Select, screen and brief the most suitable personnel.",
  "Deploy with a clear reporting and escalation structure.",
  "Supervise performance and maintain workforce continuity.",
];

const values = [
  { icon: ShieldCheck, title: "Our Mission", text: "Provide dependable security and workforce services through trained people, clear systems and active supervision." },
  { icon: Eye, title: "Our Vision", text: "Be the most trusted integrated security and workforce partner for organisations across India." },
  { icon: Handshake, title: "Our Values", text: "Discipline · Integrity · Alertness · Accountability · Partnership" },
];

export default function Home() {
  useSeo(pages.home, [organizationSchema, ...servicesSchema]);

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden bg-navy-deep text-white md:min-h-[720px]">
        <img src={images.aiifTeamHero} alt="Integrated Indian security team ready for deployment" width="1752" height="897" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,24,38,.94)_0%,rgba(4,24,38,.76)_40%,rgba(4,24,38,.08)_78%)]" />
        <div className="relative mx-auto flex min-h-[620px] max-w-[1530px] items-end px-5 pb-16 sm:px-8 md:min-h-[720px] md:pb-20 lg:px-12">
          <div className="max-w-[660px]">
            <p className="text-sm font-semibold text-blue-300">Integrated Security & Workforce Solutions</p>
            <h1 className="mt-5 text-balance text-[2.25rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4rem]">Security that keeps your world moving.</h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-7 text-white/80">AIIF brings trained guards, surveillance, investigation, housekeeping staff, payroll and professional training under one accountable team.</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <CTA href="/contact" testId="button-hero-enquire">Request a Proposal</CTA>
              <CTA href="/services" variant="light" testId="button-hero-services">Explore Our Services</CTA>
            </div>
            <a href="#about-aiif" className="mt-10 inline-flex items-center gap-3 text-sm font-semibold hover:text-blue-300">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-signal text-blue-300"><ArrowDown aria-hidden="true" className="h-4 w-4" /></span>
              Get to know AIIF
            </a>
          </div>
        </div>
      </section>

      <section id="about-aiif" className="bg-[#f3f4f5] py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">About AIIF</p></Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal><h2 className="text-4xl font-normal leading-tight text-navy-deep md:text-5xl">A disciplined partner for people, premises and operations.</h2></Reveal>
              <Reveal delay={0.05}>
                <img src={images.aiifHousekeeping} alt="Housekeeping and facility staff coordinating daily operations" width="1536" height="1024" loading="lazy" className="mt-8 aspect-[4/3] w-full object-cover" />
              </Reveal>
            </div>
            <Reveal delay={0.08} className="flex flex-col justify-end">
              <p className="text-xl font-semibold text-navy-deep">{org.legalName}</p>
              <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
                <p>AIIF is an integrated Indian security and workforce company built around one practical idea: clients should not have to coordinate separate agencies for guarding, monitoring, staffing and workforce administration.</p>
                <p>We assess each site, select and brief personnel for the assignment, define responsibilities and maintain a clear escalation structure. This creates a service that is visible at the gate and accountable behind the scenes.</p>
                <p>Our security, investigation and education capabilities work together so clients receive a solution shaped around their real operating environment.</p>
              </div>
              <dl className="mt-8 grid gap-px bg-slate-300 sm:grid-cols-3">
                <div className="bg-white p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Incorporated</dt><dd className="mt-2 font-semibold text-navy-deep">{org.incorporatedOn}</dd></div>
                <div className="bg-white p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered</dt><dd className="mt-2 font-semibold text-navy-deep">Maharashtra</dd></div>
                <div className="bg-white p-4"><dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">CIN</dt><dd className="mt-2 break-all text-sm font-semibold text-navy-deep">{org.cin}</dd></div>
              </dl>
              <div className="mt-8"><CTA href="/about" variant="ghost" testId="button-home-about">About the Company</CTA></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">How We Get It Done</p></Reveal>
          <div className="mt-10 grid overflow-hidden lg:grid-cols-2">
            <Reveal>
              <img src={images.aiifFieldTeam} alt="Integrated force team receiving an operational briefing" width="1752" height="897" loading="lazy" className="h-full min-h-[420px] w-full object-cover" />
            </Reveal>
            <Reveal delay={0.06} className="bg-signal p-7 text-white sm:p-10 lg:p-14">
              <h2 className="text-3xl font-semibold">Our Methodology</h2>
              <p className="mt-4 max-w-lg leading-7 text-white/80">A reliable deployment begins with understanding the job before assigning the team.</p>
              <ul className="mt-9 space-y-5">
                {method.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-white/20 pb-4 text-sm font-semibold leading-6 last:border-b-0">
                    <Plus aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">Services We Offer</p></Reveal>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            <div>
              <Reveal><h2 className="max-w-md text-4xl font-normal leading-tight text-navy-deep md:text-5xl">One alliance of experts at your service.</h2></Reveal>
            </div>
            <Reveal delay={0.04}><p className="max-w-xl text-lg leading-7 text-slate-600">Our integrated services combine trained personnel, technology, investigation and workforce support to match the operating needs of each client.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id];
              return (
                <Reveal key={service.id} delay={0.035 * index}>
                  <Link href={`/services?s=${service.id}`} data-testid={`card-service-${service.id}`} className="group block bg-navy-deep text-white">
                    <div className="relative overflow-hidden">
                      <img src={service.image} alt="" width="1024" height="1024" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                      <span className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-white text-signal shadow-sm transition-colors group-hover:bg-signal group-hover:text-white">
                        <Plus aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex min-h-28 items-center gap-4 px-7 py-6">
                      <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-blue-300" />
                      <h3 className="text-2xl font-semibold">{service.name}</h3>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f4f5] py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">What We Stand For</p></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={0.05 * index} className="h-full">
                <article className="h-full min-h-72 bg-white p-8">
                  <value.icon aria-hidden="true" className="ml-auto h-14 w-14 stroke-[1.4] text-navy" />
                  <h3 className="mt-10 text-2xl font-semibold text-navy-deep">{value.title}</h3>
                  <p className="mt-4 leading-6 text-slate-600">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">Industries We Support</p></Reveal>
          <div className="mt-10 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Reveal key={industry.id}>
                <Link href={`/industries#${industry.id}`} className="group flex min-h-56 flex-col justify-between border-b border-r border-slate-200 p-7 hover:bg-[#f5f7fa]">
                  <h3 className="text-2xl font-semibold text-navy-deep">{industry.name}</h3>
                  <p className="mt-8 leading-6 text-slate-500">{industry.challenge}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
