import { Link } from "wouter";
import { CtaBand, PageHero, Reveal, useSeo } from "@/components/site";
import { images, industries, organizationSchema, pages, services } from "@/data/site";

const pics = [
  { src: images.headquartersTeam, focus: "object-center" },
  { src: images.facilityTeamBlack, focus: "object-top" },
  { src: images.trainingTeam, focus: "object-center" },
  { src: images.surveillance, focus: "object-center" },
  { src: images.tacticalGuards, focus: "object-center" },
  { src: images.indianSecurityTeam, focus: "object-center" },
];

export default function Industries() {
  useSeo(pages.industries, [organizationSchema]);
  return (
    <>
      <PageHero eyebrow="Industries" title="Different sites. Same discipline." intro="Every premises has its own rhythm. Here is how AIIF adapts guarding, surveillance and workforce support to the sectors we serve." image={images.tacticalGuards} imageFocus="top" />

      <nav aria-label="Jump to industry" className="sticky top-[77px] z-30 border-b border-border bg-background/95 backdrop-blur sm:top-[89px] lg:top-[153px]">
        <div className="mx-auto flex max-w-[1530px] gap-7 overflow-x-auto px-5 py-4 text-sm font-semibold whitespace-nowrap sm:px-8 lg:px-12">
          {industries.map((i) => <a key={i.id} href={`#${i.id}`} className="text-slate-600 transition-colors hover:text-signal" data-testid={`link-jump-${i.id}`}>{i.name}</a>)}
        </div>
      </nav>

      <div className="mx-auto max-w-[1530px] space-y-20 px-5 py-16 sm:px-8 md:space-y-28 md:py-24 lg:px-12">
        {industries.map((ind, idx) => (
          <section key={ind.id} id={ind.id} className="grid scroll-mt-44 items-center gap-10 lg:grid-cols-12 lg:scroll-mt-64 lg:gap-16">
            <Reveal className={`lg:col-span-5 ${idx % 2 ? "lg:order-2" : ""}`}>
              <img src={pics[idx % pics.length].src} alt="" width="1536" height="1024" loading="lazy" className={`aspect-[4/3] w-full object-cover ${pics[idx % pics.length].focus}`} />
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal><h2 className="text-4xl font-semibold leading-tight text-navy-deep md:text-5xl" data-testid={`text-industry-${ind.id}`}>{ind.name}</h2></Reveal>
              <Reveal delay={0.08}>
                <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div className="border-l-2 border-signal pl-5"><dt className="text-sm font-semibold text-signal">The Challenge</dt><dd className="mt-3 text-lg leading-7 text-slate-600">{ind.challenge}</dd></div>
                  <div className="border-l-2 border-navy pl-5"><dt className="text-sm font-semibold text-navy">Our Approach</dt><dd className="mt-3 text-lg leading-7 text-slate-600">{ind.approach}</dd></div>
                </dl>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {ind.services.map((sid) => {
                    const s = services.find((x) => x.id === sid)!;
                    return <Link key={sid} href={`/services?s=${sid}`} data-testid={`link-${ind.id}-${sid}`} className="bg-navy px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-signal">{s.name}</Link>;
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
