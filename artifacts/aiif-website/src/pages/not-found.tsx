import { CTA } from '@/components/site';

export default function NotFound() {
  return (
    <section className="bg-navy-deep text-paper chevrons min-h-[70dvh] grid place-items-center px-5">
      <div className="text-center max-w-xl">
        <span className="eyebrow">Off post</span>
        <h1 className="mt-4 font-display text-8xl md:text-9xl font-bold text-signal leading-none">404</h1>
        <p className="mt-4 text-xl text-paper/80">This route is not on our patrol map.</p>
        <div className="mt-8 flex justify-center"><CTA href="/" testId="button-404-home">Back to Home</CTA></div>
      </div>
    </section>
  );
}
