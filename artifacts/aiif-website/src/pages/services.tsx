import { useEffect } from "react";
import { Link, useSearch } from "wouter";
import { Building2, Check, Plus } from "lucide-react";
import { CTA, CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";
import { serviceIcons } from "@/pages/home";

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
      <PageHero eyebrow="Our Services" title={<>Expert support for every part of the operation.</>} intro="AIIF combines security personnel, technology, investigation, workforce support and training in one integrated service model." image={images.surveillance} />

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
              return (
                <Reveal key={service.id} delay={0.035 * index}>
                  <Link href={`/services?s=${service.id}#service-detail`} data-testid={`card-service-${service.id}`} aria-current={selected ? "page" : undefined} className={`group block text-white ${selected ? "bg-signal" : "bg-navy-deep"}`}>
                    <div className="relative overflow-hidden">
                      <img src={service.image} alt="" width="1024" height="1024" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
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
              <img src={active.image} alt={active.name} width="1024" height="1024" className="aspect-[4/3] w-full object-cover" />
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
