import { useState } from "react";
import { useSearch } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, HardDrive, Instagram, Clock, MapPin, RotateCcw } from "lucide-react";
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

const field = "w-full bg-card border border-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-navy focus:ring-2 focus:ring-signal/30 transition-[border-color,box-shadow]";
const label = "text-sm font-semibold text-navy";

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
      <PageHero eyebrow="Contact" title={<>Tell us about <span className="text-signal">your site</span></>} intro="Share your premises, requirement and timings, or connect through AIIF's verified public profile." image={images.corporateOfficers} />

      <section id="page-content" className="mx-auto grid max-w-[1530px] gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4 space-y-6">
          <Reveal>
            <div className="border border-slate-200 bg-[#f3f4f5] p-5">
              <p className="flex items-center gap-2 text-lg font-semibold text-navy-deep"><Building2 aria-hidden="true" className="h-5 w-5 text-signal" /> Registered Company</p>
              <p className="mt-3 text-sm leading-6 text-slate-600"><strong>CIN:</strong> {org.cin}<br /><strong>Incorporated:</strong> {org.incorporatedOn}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="bg-navy-deep text-paper rounded-sm p-6 chevrons">
              <h2 className="text-2xl font-semibold">Reach AIIF</h2>
              <p className="mt-3 flex items-start gap-3 text-sm leading-6 text-paper/75"><MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-blue-300" /> {org.registeredOffice}</p>
              <p className="mt-5 text-sm text-paper/75">Verified public channel:</p>
              <a href={org.instagram} target="_blank" rel="noreferrer" data-testid="link-contact-instagram" className="mt-5 flex items-center gap-3 transition-colors hover:text-signal"><Instagram aria-hidden="true" className="h-5 w-5" /> @{org.handle}</a>
              <p className="mt-3 flex items-center gap-3"><Clock aria-hidden="true" className="h-5 w-5" /> 24/7 Support</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}><img src={images.facilityTeamGrey} alt="AIIF facility support personnel ready for an assignment" width="1280" height="1920" loading="lazy" className="hidden aspect-[4/3] w-full object-cover object-top lg:block" /></Reveal>
        </div>

        <div className="lg:col-span-8">
          {saved ? (
              <div className="bg-card border border-card-border rounded-sm p-8 md:p-12" data-testid="status-saved-locally">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-navy text-paper"><HardDrive aria-hidden="true" className="h-6 w-6" /></span>
                <h2 className="mt-6 text-4xl font-semibold text-navy">Saved on This Device Only</h2>
                <p className="mt-4 text-lg text-muted-foreground">Reference <strong className="text-navy font-mono">{saved.ref}</strong>. This enquiry was <strong className="text-signal">not delivered</strong> to AIIF. It is stored in your browser's local storage ({saved.count} demo {saved.count === 1 ? "entry" : "entries"} in total). No email or message has been sent.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setSaved(null)} data-testid="button-new-enquiry" className="bg-signal px-6 py-3.5 font-semibold text-white transition-colors hover:bg-navy">Write Another</button>
                  <button type="button" onClick={clear} data-testid="button-clear-local" className="inline-flex items-center gap-2 border border-navy/25 px-6 py-3.5 font-semibold text-navy transition-colors hover:border-navy"><RotateCcw aria-hidden="true" className="h-4 w-4" /> Clear Local Demo Data</button>
                </div>
              </div>
            ) : (
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="bg-card border border-card-border rounded-sm p-6 md:p-10 grid sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <h2 className="text-3xl font-semibold text-navy md:text-4xl">Enquiry Planner</h2>
                      <p className="mt-2 text-sm text-slate-500">This preview prepares and stores your requirement on this device only; it does not transmit data.</p>
                    </div>
                    {([["name", "Full name", "Your name", "text", "name"], ["organisation", "Organisation (optional)", "Company or society", "text", "organization"], ["email", "Email", "you@company.in", "email", "email"], ["phone", "Phone", "+91 98765 43210", "tel", "tel"]] as const).map(([n, l, p, t, auto]) => (
                      <FormField key={n} control={form.control} name={n} render={({ field: f }) => (
                        <FormItem><FormLabel className={label}>{l}</FormLabel><FormControl><input {...f} value={(f.value as string) ?? ""} type={t} name={n} autoComplete={auto} spellCheck={n === "email" ? false : undefined} placeholder={`${p}…`} className={field} data-testid={`input-${n}`} /></FormControl><FormMessage /></FormItem>
                      )} />
                    ))}
                    <FormField control={form.control} name="service" render={({ field: f }) => (
                      <FormItem><FormLabel className={label}>Service required</FormLabel><FormControl>
                        <select {...f} name="service" autoComplete="off" className={field} data-testid="select-service">
                          <option value="">Select a service</option>
                          {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                          <option value="multiple">Multiple / not sure</option>
                        </select></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="city" render={({ field: f }) => (
                      <FormItem><FormLabel className={label}>Site city</FormLabel><FormControl><input {...f} name="city" autoComplete="address-level2" placeholder="For example, Pune…" className={field} data-testid="input-city" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field: f }) => (
                      <FormItem className="sm:col-span-2"><FormLabel className={label}>Requirement</FormLabel><FormControl><textarea {...f} name="message" autoComplete="off" rows={5} placeholder="Type of premises, number of posts or staff, shift timings and start date…" className={field} data-testid="input-message" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="consent" render={({ field: f }) => (
                      <FormItem className="sm:col-span-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <FormControl><input type="checkbox" name="consent" checked={!!f.value} onChange={(e) => f.onChange(e.target.checked)} className="mt-1 h-5 w-5 accent-signal" data-testid="checkbox-consent" /></FormControl>
                          <span className="text-sm">I understand this is a demo. My enquiry will be saved only in this browser and will not be sent to AIIF.</span>
                        </label><FormMessage /></FormItem>
                    )} />
                    <div className="sm:col-span-2">
                      <button type="submit" data-testid="button-submit" className="w-full bg-signal px-8 py-4 font-semibold text-white transition-colors hover:bg-navy sm:w-auto">Save Demo Enquiry Locally</button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
        </div>
      </section>
    </>
  );
}
