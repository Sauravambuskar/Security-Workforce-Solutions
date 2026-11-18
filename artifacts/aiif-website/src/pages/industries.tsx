import { Link } from "wouter";
import { CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, industries, organizationSchema, pages, services } from "@/data/site";

const pics = [images.headquartersTeam, images.facilityTeamBlack, images.trainingTeam, images.surveillance, images.tacticalGuards, images.indianSecurityTeam];

export default function Industries() {
  useSeo(pages.industries, [organizationSchema]);
  return (
    <>
      <PageHero eyebrow="Industries" title={<>Different sites. <span className="text-signal">Same discipline.</span></>} intro="Every premises has its own rhythm. Here is how AIIF adapts guarding, surveillance and workforce support to the sectors we serve." image={images.tacticalGuards} />

      <nav aria-label="Jump to industry" className="sticky top-[89px] z-30 border-b border-border bg-background/95 backdrop-blur lg:top-[153px]">
        <div className="mx-auto max-w-7xl px-5 flex gap-6 overflow-x-auto py-4 font-cond uppercase tracking-[0.14em] text-sm whitespace-nowrap">
          {industries.map((i) => <a key={i.id} href={`#${i.id}`} className="text-navy hover:text-signal transition-colors" data-testid={`link-jump-${i.id}`}>{i.name}</a>)}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-20 space-y-24">
        {industries.map((ind, idx) => (
          <section key={ind.id} id={ind.id} className="scroll-mt-48 grid lg:grid-cols-12 gap-10 items-center">
            <Reveal className={`lg:col-span-5 ${idx % 2 ? "lg:order-2" : ""}`}>
              <div className="relative">
                <img src={pics[idx % pics.length]} alt="" width="1536" height="1024" loading="lazy" className="aspect-[4/3] w-full object-cover shadow-lg" />
                <span className="absolute -top-4 -left-4 h-16 w-16 grid place-items-center bg-signal text-paper font-display text-2xl rounded-sm">0{idx + 1}</span>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal><h2 className="text-4xl md:text-5xl font-bold uppercase text-navy leading-none" data-testid={`text-industry-${ind.id}`}>{ind.name}</h2></Reveal>
              <Reveal delay={0.08}>
                <dl className="mt-6 grid sm:grid-cols-2 gap-6">
                  <div className="border-l-2 border-signal pl-4"><dt className="font-cond uppercase tracking-[0.2em] text-xs text-signal font-semibold">The challenge</dt><dd className="mt-2 text-lg">{ind.challenge}</dd></div>
                  <div className="border-l-2 border-navy pl-4"><dt className="font-cond uppercase tracking-[0.2em] text-xs text-navy font-semibold">Our approach</dt><dd className="mt-2 text-lg">{ind.approach}</dd></div>
                </dl>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ind.services.map((sid) => {
                    const s = services.find((x) => x.id === sid)!;
                    return <Link key={sid} href={`/services?s=${sid}`} data-testid={`link-${ind.id}-${sid}`} className="px-3 py-2 rounded-sm bg-navy text-paper text-sm font-cond uppercase tracking-[0.1em] hover:bg-signal transition-colors">{s.name}</Link>;
                  })}
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
