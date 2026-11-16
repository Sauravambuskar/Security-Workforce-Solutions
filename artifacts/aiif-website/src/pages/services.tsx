import { useEffect, useState } from "react";
import { useSearch, useLocation } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Building2 } from "lucide-react";
import { CTA, CtaBand, PageHero, useSeo } from "@/components/site";
import { images, organizationSchema, pages, services, servicesSchema, type ServiceId } from "@/data/site";
import { serviceIcons } from "@/pages/home";

export default function Services() {
  useSeo(pages.services, [organizationSchema, ...servicesSchema]);
  const search = useSearch();
  const [, navigate] = useLocation();
  const reduce = useReducedMotion();
  const param = new URLSearchParams(search).get("s") as ServiceId | null;
  const initial = services.find((s) => s.id === param)?.id ?? services[0].id;
  const [active, setActive] = useState<ServiceId>(initial);

  useEffect(() => {
    if (param && services.some((s) => s.id === param)) {
      setActive(param);
      document.getElementById("catalogue")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
  }, [param, reduce]);

  const svc = services.find((s) => s.id === active)!;
  const select = (id: ServiceId) => {
    setActive(id);
    navigate(`/services?s=${id}`, { replace: true });
  };

  return (
    <>
      <PageHero eyebrow="Service catalogue" title={<>Every post <span className="text-signal">covered</span></>} intro="Six services, one chain of command. Select a service to see its scope, how we deliver it and where it fits best." image={images.surveillance} />

      <section id="catalogue" className="mx-auto max-w-7xl px-5 py-20 scroll-mt-32 grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <span className="eyebrow">Select a service</span>
            <div role="tablist" aria-label="Services" className="mt-5 flex lg:flex-col gap-2 overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 snap-x">
              {services.map((s) => {
                const Icon = serviceIcons[s.id];
                const on = s.id === active;
                return (
                  <button key={s.id} role="tab" aria-selected={on} aria-controls="service-panel" onClick={() => select(s.id)} data-testid={`tab-service-${s.id}`}
                    className={`snap-start shrink-0 relative flex items-center gap-4 text-left px-5 py-4 rounded-sm border transition-colors duration-300 ${on ? "bg-navy text-paper border-navy" : "bg-card border-card-border text-navy hover:border-navy/40"}`}>
                    {on && <motion.span layoutId="svc-bar" className="absolute left-0 top-0 bottom-0 w-1 bg-signal" />}
                    <Icon className={`h-5 w-5 shrink-0 ${on ? "text-signal" : ""}`} />
                    <span><span className="block font-cond text-xs tracking-[0.2em] opacity-60">{s.code}</span><span className="block font-display uppercase text-lg leading-tight whitespace-nowrap lg:whitespace-normal">{s.name}</span></span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8" id="service-panel" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.article key={svc.id} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative overflow-hidden rounded-sm aspect-[16/8]">
                <img src={svc.image} alt={svc.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                <div className="absolute bottom-0 p-6 md:p-8 text-paper">
                  <span className="font-display text-6xl md:text-8xl text-signal/90 leading-none">{svc.code}</span>
                  <h2 className="text-3xl md:text-5xl uppercase font-bold leading-none" data-testid="text-service-name">{svc.name}</h2>
                </div>
              </div>
              <p className="mt-8 text-xl text-navy leading-relaxed">{svc.summary}</p>

              <div className="mt-10 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-cond uppercase tracking-[0.2em] text-sm text-signal font-semibold">Scope of work</h3>
                  <ul className="mt-4 space-y-3">
                    {svc.scope.map((x) => <li key={x} className="flex gap-3"><Check className="h-5 w-5 text-signal shrink-0 mt-0.5" /><span>{x}</span></li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-cond uppercase tracking-[0.2em] text-sm text-signal font-semibold">Suited for</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {svc.suitedFor.map((x) => <span key={x} className="inline-flex items-center gap-2 px-3 py-2 bg-accent text-navy rounded-sm text-sm font-medium"><Building2 className="h-4 w-4" />{x}</span>)}
                  </div>
                </div>
              </div>

              <h3 className="mt-12 font-cond uppercase tracking-[0.2em] text-sm text-signal font-semibold">How we deliver</h3>
              <ol className="mt-5 grid sm:grid-cols-2 gap-px bg-border border border-border rounded-sm overflow-hidden">
                {svc.process.map((p, i) => (
                  <li key={p.step} className="bg-card p-6">
                    <span className="font-display text-3xl text-navy/25">0{i + 1}</span>
                    <h4 className="mt-1 text-lg uppercase text-navy">{p.step}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{p.detail}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-wrap gap-3">
                <CTA href={`/contact?service=${svc.id}`} testId="button-service-enquire">Enquire about {svc.name}</CTA>
                <CTA href="/industries" variant="ghost" testId="button-service-industries">See Industries</CTA>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
