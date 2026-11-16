import { useState } from "react";
import { useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, HardDrive, Instagram, Clock, RotateCcw } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PageHero, Reveal, useSeo } from "@/components/site";
import { images, org, organizationSchema, pages, services } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  organisation: z.string().trim().max(120).optional(),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,15}$/, "Enter a valid phone number."),
  service: z.string().min(1, "Choose a service."),
  city: z.string().trim().min(2, "Which city is the site in?"),
  message: z.string().trim().min(20, "A little more detail helps (20+ characters).").max(1500),
  consent: z.literal(true, { errorMap: () => ({ message: "Please acknowledge this is a demo form." }) }),
});
type Values = z.infer<typeof schema>;
const STORE = "aiif-demo-enquiries";

const field = "w-full bg-card border border-input rounded-sm px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-navy focus:ring-2 focus:ring-signal/30 transition";
const label = "font-cond uppercase tracking-[0.16em] text-xs font-semibold text-navy";

export default function Contact() {
  useSeo(pages.contact, [organizationSchema]);
  const pre = new URLSearchParams(useSearch()).get("service") ?? "";
  const [saved, setSaved] = useState<{ count: number; ref: string } | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", organisation: "", email: "", phone: "", service: services.some((s) => s.id === pre) ? pre : "", city: "", message: "", consent: false as unknown as true },
  });

  const onSubmit = (v: Values) => {
    const ref = `DEMO-${Date.now().toString(36).toUpperCase()}`;
    let list: unknown[] = [];
    try { list = JSON.parse(localStorage.getItem(STORE) ?? "[]"); } catch { list = []; }
    list.push({ ...v, ref, savedAt: new Date().toISOString() });
    try { localStorage.setItem(STORE, JSON.stringify(list)); } catch { /* storage unavailable */ }
    setSaved({ count: list.length, ref });
    form.reset();
  };

  const clear = () => { localStorage.removeItem(STORE); setSaved(null); };

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Tell us about <span className="text-signal">your site</span></>} intro="Share your premises, requirement and timings. This presentation build stores enquiries only in your browser." image={images.heroGuard} />

      <section className="mx-auto max-w-7xl px-5 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <Reveal>
            <div role="note" className="border-2 border-signal bg-signal/5 rounded-sm p-5" data-testid="status-demo-notice">
              <p className="flex items-center gap-2 font-display uppercase text-signal text-lg"><AlertTriangle className="h-5 w-5" /> Demo form</p>
              <p className="mt-2 text-sm leading-relaxed">Submissions are <strong>not sent</strong> to AIIF or anyone else. They are saved only in this browser's local storage for presentation purposes.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="bg-navy-deep text-paper rounded-sm p-6 chevrons">
              <h2 className="font-display uppercase text-2xl">Reach AIIF</h2>
              <p className="mt-3 text-paper/75 text-sm">Official phone, email and address will be added once confirmed by AIIF. Meanwhile, the verified public channel is:</p>
              <a href={org.instagram} target="_blank" rel="noreferrer" data-testid="link-contact-instagram" className="mt-5 flex items-center gap-3 hover:text-signal transition-colors"><Instagram className="h-5 w-5" /> @{org.handle}</a>
              <p className="mt-3 flex items-center gap-3"><Clock className="h-5 w-5" /> 24/7 Support</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}><img src={images.staffing} alt="" loading="lazy" className="hidden lg:block rounded-sm aspect-[4/3] object-cover w-full" /></Reveal>
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {saved ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-card border border-card-border rounded-sm p-8 md:p-12" data-testid="status-saved-locally">
                <span className="h-14 w-14 grid place-items-center rounded-full bg-navy text-paper"><HardDrive className="h-6 w-6" /></span>
                <h2 className="mt-6 text-4xl uppercase font-bold text-navy">Saved on this device only</h2>
                <p className="mt-4 text-lg text-muted-foreground">Reference <strong className="text-navy font-mono">{saved.ref}</strong>. This enquiry was <strong className="text-signal">not delivered</strong> to AIIF. It is stored in your browser's local storage ({saved.count} demo {saved.count === 1 ? "entry" : "entries"} in total). No email or message has been sent.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button onClick={() => setSaved(null)} data-testid="button-new-enquiry" className="px-6 py-3.5 bg-signal text-paper rounded-sm font-cond uppercase tracking-[0.12em] font-semibold hover:bg-navy transition-colors">Write another</button>
                  <button onClick={clear} data-testid="button-clear-local" className="inline-flex items-center gap-2 px-6 py-3.5 border border-navy/25 text-navy rounded-sm font-cond uppercase tracking-[0.12em] font-semibold hover:border-navy transition-colors"><RotateCcw className="h-4 w-4" /> Clear local demo data</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="bg-card border border-card-border rounded-sm p-6 md:p-10 grid sm:grid-cols-2 gap-6">
                    <h2 className="sm:col-span-2 text-3xl md:text-4xl uppercase font-bold text-navy">Enquiry form <span className="text-sm align-middle ml-2 px-2 py-1 bg-signal text-paper rounded-sm font-cond tracking-[0.14em]">Demo</span></h2>
                    {([["name", "Full name", "Your name", "text"], ["organisation", "Organisation (optional)", "Company or society", "text"], ["email", "Email", "you@company.in", "email"], ["phone", "Phone", "+91 ...", "tel"]] as const).map(([n, l, p, t]) => (
                      <FormField key={n} control={form.control} name={n} render={({ field: f }) => (
                        <FormItem><FormLabel className={label}>{l}</FormLabel><FormControl><input {...f} value={(f.value as string) ?? ""} type={t} placeholder={p} className={field} data-testid={`input-${n}`} /></FormControl><FormMessage /></FormItem>
                      )} />
                    ))}
                    <FormField control={form.control} name="service" render={({ field: f }) => (
                      <FormItem><FormLabel className={label}>Service required</FormLabel><FormControl>
                        <select {...f} className={field} data-testid="select-service">
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                          <option value="multiple">Multiple / not sure</option>
                        </select></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field: f }) => (
                      <FormItem><FormLabel className={label}>Site city</FormLabel><FormControl><input {...f} placeholder="e.g. Pune" className={field} data-testid="input-city" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field: f }) => (
                      <FormItem className="sm:col-span-2"><FormLabel className={label}>Requirement</FormLabel><FormControl><textarea {...f} rows={5} placeholder="Type of premises, number of posts or staff, shift timings, start date..." className={field} data-testid="input-message" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="consent" render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <FormControl><input type="checkbox" checked={!!f.value} onChange={(e) => f.onChange(e.target.checked)} className="mt-1 h-5 w-5 accent-[hsl(356_80%_47%)]" data-testid="checkbox-consent" /></FormControl>
                          <span className="text-sm">I understand this is a demo. My enquiry will be saved only in this browser and will not be sent to AIIF.</span>
                        </label><FormMessage /></FormItem>
                    )} />
                    <div className="sm:col-span-2">
                      <button type="submit" data-testid="button-submit" className="w-full sm:w-auto px-8 py-4 bg-signal text-paper rounded-sm font-cond uppercase tracking-[0.14em] font-semibold hover:bg-navy transition-colors">Save Demo Enquiry Locally</button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
