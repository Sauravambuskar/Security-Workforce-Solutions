import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import { Building2, Check, Plus } from "lucide-react";
import { CTA, CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";
import { serviceIcons } from "@/pages/home";
import aiifLogo from "@/assets/aiif-logo.png";

function SurveillanceArtwork() {
  return (
    <figure className="relative mx-auto aspect-[4/5] max-h-[760px] overflow-hidden bg-navy-deep text-white">
      <img src={images.surveillance} alt="AIIF surveillance control room monitoring" width="1024" height="1024" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,35,.15)_0%,rgba(3,18,35,.12)_38%,rgba(3,18,35,.92)_100%)]" />
      <div className="absolute inset-x-4 top-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/15 bg-navy-deep/75 px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm sm:inset-x-6 sm:top-6 sm:text-xs">
        <span className="h-2 w-2 rounded-full bg-signal" />
        <span>24/7 Surveillance</span><span className="text-white/40">•</span><span>Control Room Monitoring</span><span className="hidden text-white/40 sm:inline">•</span><span className="hidden sm:inline">Professional Protection</span>
      </div>
      <img src={aiifLogo} alt="" width="166" height="166" className="absolute right-[12%] top-[55%] w-14 sm:w-20" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
        <p className="flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs"><span className="h-px w-12 bg-signal" /> AIIF Security Solutions</p>
        <h3 className="mt-5 max-w-sm text-[2.4rem] font-semibold uppercase leading-[0.88] sm:text-6xl"><span className="block">Trusted</span><span className="block font-light">Protection</span><span className="block">Every Day</span></h3>
        <p className="mt-6 max-w-md text-sm leading-6 text-white/75 sm:text-base">Licensed security personnel, advanced surveillance systems and round-the-clock monitoring for corporate and residential safety.</p>
      </figcaption>
    </figure>
  );
}

export default function Services() {
  useSeo(pages.services, [organizationSchema, ...servicesSchema]);
  const search = useSearch();
  const requested = new URLSearchParams(search).get("s") as ServiceId | null;
  const active = services.find((service) => service.id === requested) ?? services[0];

  useEffect(() => {
    if (requested) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("service-detail")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  }, [requested]);

  return (
    <>
      <PageHero eyebrow="Our Services" title={<>Expert support for every part of the operation.</>} intro="AIIF combines security personnel, technology, investigation, workforce support and training in one integrated service model." image={images.tacticalGuards} imageFocus="top" />

      <section id="page-content" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <Reveal><p className="section-label">Services We Offer</p></Reveal>
          <div className="mt-9 grid gap-8 md:grid-cols-2">
            <Reveal><h2 className="max-w-md text-4xl font-normal leading-tight text-navy-deep md:text-5xl">An alliance of experts at your service.</h2></Reveal>
            <Reveal delay={0.04}><p className="max-w-xl text-lg leading-7 text-slate-600">Select a service to review its scope, delivery method and the sites it is designed to support.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.id];
              const selected = active.id === service.id;
              const imageFocus = service.imageFocus === "top" ? "object-top" : "object-center";
              return (
                <Reveal key={service.id} delay={0.035 * index}>
                  <Link href={`/services?s=${service.id}#service-detail`} data-testid={`card-service-${service.id}`} aria-current={selected ? "page" : undefined} className={`group block text-white ${selected ? "bg-signal" : "bg-navy-deep"}`}>
                    <div className="relative overflow-hidden">
                      <img src={service.image} alt="" width="1024" height="1024" loading="lazy" className={`aspect-[16/9] w-full object-cover ${imageFocus} transition-transform duration-500 group-hover:scale-[1.025]`} />
                      <span className={`absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-white shadow-sm ${selected ? "text-navy" : "text-signal"}`}><Plus aria-hidden="true" className="h-5 w-5" /></span>
                    </div>
                    <div className="flex min-h-28 items-center gap-4 px-7 py-6">
                      <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-blue-200" />
                      <h3 className="text-2xl font-semibold">{service.name}</h3>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="service-detail" className="bg-[#f3f4f5] py-16 md:py-24" aria-live="polite">
        <div className="mx-auto max-w-[1530px] px-5 sm:px-8 lg:px-12">
          <p className="section-label">Selected Service</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              {active.id === "surveillance" ? <SurveillanceArtwork /> : <img src={active.image} alt={active.name} width="1024" height="1024" className={`aspect-[4/3] w-full object-cover ${active.imageFocus === "top" ? "object-top" : "object-center"}`} />}
            </div>
            <article>
              <p className="text-sm font-semibold text-signal">Service {active.code}</p>
              <h2 className="mt-4 text-4xl font-semibold text-navy-deep md:text-5xl" data-testid="text-service-name">{active.name}</h2>
              <p className="mt-6 text-lg leading-7 text-slate-600">{active.summary}</p>
              <h3 className="mt-9 text-xl font-semibold text-navy-deep">Scope of Work</h3>
              <ul className="mt-4 space-y-3">
                {active.scope.map((item) => <li key={item} className="flex gap-3 text-slate-600"><Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-signal" /><span>{item}</span></li>)}
              </ul>
              <h3 className="mt-9 text-xl font-semibold text-navy-deep">Suited For</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {active.suitedFor.map((item) => <span key={item} className="inline-flex items-center gap-2 bg-white px-3 py-2 text-sm font-medium text-navy"><Building2 aria-hidden="true" className="h-4 w-4" />{item}</span>)}
              </div>
              <div className="mt-9"><CTA href={`/contact?service=${active.id}`} testId="button-service-enquire">Enquire About This Service</CTA></div>
            </article>
          </div>

          <div className="mt-16">
            <p className="section-label">How We Deliver</p>
            <ol className="mt-8 grid gap-px bg-slate-300 sm:grid-cols-2 lg:grid-cols-4">
              {active.process.map((step, index) => (
                <li key={step.step} className="bg-white p-6">
                  <span className="text-sm font-semibold text-signal">0{index + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold text-navy-deep">{step.step}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
