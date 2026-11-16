import heroGuard from "@/assets/hero-guard.jpg";
import surveillance from "@/assets/surveillance.jpg";
import teamBriefing from "@/assets/team-briefing.jpg";
import training from "@/assets/training.jpg";
import investigation from "@/assets/investigation.jpg";
import staffing from "@/assets/staffing.jpg";
import nightPatrol from "@/assets/night-patrol.jpg";

/* ---------- Schema ---------- */
export type ServiceId =
  | "manned-guarding"
  | "surveillance"
  | "investigation"
  | "staffing"
  | "payroll"
  | "training";

export interface Service {
  id: ServiceId;
  code: string;
  name: string;
  short: string;
  summary: string;
  image: string;
  scope: string[];
  process: { step: string; detail: string }[];
  suitedFor: string[];
}

export interface Industry {
  id: string;
  name: string;
  challenge: string;
  approach: string;
  services: ServiceId[];
}

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

/* ---------- Organisation (only what the public profile states) ---------- */
export const org = {
  legalName: "Alliance International Integrated Force Pvt Ltd",
  shortName: "AIIF",
  handle: "aiifofficial",
  instagram: "https://www.instagram.com/aiifofficial/",
  tagline: "Trained Guards. Smart Tech. 24/7 Support.",
  pillars: ["Security", "Investigation", "Education"],
  lines: ["Security", "Staffing", "Payroll"],
  country: "India",
} as const;

export const images = { heroGuard, surveillance, teamBriefing, training, investigation, staffing, nightPatrol };

/* ---------- Services ---------- */
export const services: Service[] = [
  {
    id: "manned-guarding",
    code: "01",
    name: "Trained Security Guards",
    short: "Disciplined, uniformed personnel for gates, floors and perimeters.",
    summary:
      "Uniformed guards deployed to a written post order for your site — access control, visitor logs, patrols and incident reporting, supervised and accountable shift by shift.",
    image: heroGuard,
    scope: [
      "Gate and access control with visitor and vehicle registers",
      "Static posts and scheduled perimeter patrols",
      "Day, night and rotating shift deployment",
      "Incident reporting and escalation to site management",
      "Supervisory checks on guard posts",
    ],
    process: [
      { step: "Site assessment", detail: "We walk the site and map entry points, risk areas and shift needs." },
      { step: "Post orders", detail: "Duties for every post are written down and agreed with you." },
      { step: "Deployment", detail: "Briefed personnel take post with a clear reporting line." },
      { step: "Review", detail: "Regular check-ins to adjust posts as your site changes." },
    ],
    suitedFor: ["Corporate campuses", "Residential societies", "Factories and warehouses", "Retail and events"],
  },
  {
    id: "surveillance",
    code: "02",
    name: "Smart Surveillance",
    short: "Camera-led monitoring that works alongside guards on the ground.",
    summary:
      "Technology and people working together: camera coverage planning, monitoring routines and a clear link between what is seen on screen and who responds on site.",
    image: surveillance,
    scope: [
      "Camera coverage planning for blind spots",
      "Monitoring routines tied to guard response",
      "Footage review support after incidents",
      "Integration with access control registers",
    ],
    process: [
      { step: "Coverage review", detail: "Identify what is and is not visible today." },
      { step: "Plan", detail: "Recommend placement and monitoring hours." },
      { step: "Link to response", detail: "Define who acts when something is flagged." },
      { step: "Report", detail: "Share observations and recommended changes." },
    ],
    suitedFor: ["Warehouses", "Office premises", "Housing complexes", "Educational campuses"],
  },
  {
    id: "investigation",
    code: "03",
    name: "Investigation",
    short: "Discreet, fact-based inquiries for businesses and individuals.",
    summary:
      "Confidential investigation support to establish facts — from internal incidents and background verification to pre-engagement checks — handled with discretion.",
    image: investigation,
    scope: [
      "Background and pre-employment verification",
      "Internal incident and loss inquiries",
      "Due diligence support",
      "Confidential written findings",
    ],
    process: [
      { step: "Brief", detail: "A private conversation to understand the matter." },
      { step: "Scope", detail: "Agree what will be checked and how." },
      { step: "Inquiry", detail: "Lawful, discreet fact-finding." },
      { step: "Findings", detail: "A clear report you can act on." },
    ],
    suitedFor: ["HR teams", "Business owners", "Legal and compliance", "Families"],
  },
  {
    id: "staffing",
    code: "04",
    name: "Staffing & Manpower",
    short: "Reliable workforce supply beyond security roles.",
    summary:
      "Manpower supply for operational roles — housekeeping, facility support, front office and more — sourced, screened and placed so your site keeps running.",
    image: staffing,
    scope: [
      "Sourcing and screening of candidates",
      "Short-term and long-term deployment",
      "Replacement support for absences",
      "Attendance tracking",
    ],
    process: [
      { step: "Requirement", detail: "Roles, headcount, timings and skills." },
      { step: "Sourcing", detail: "Shortlist and screen candidates." },
      { step: "Placement", detail: "Onboard staff to your site." },
      { step: "Continuity", detail: "Cover gaps and manage replacements." },
    ],
    suitedFor: ["Facilities", "Manufacturing", "Hospitality", "Healthcare"],
  },
  {
    id: "payroll",
    code: "05",
    name: "Payroll Management",
    short: "Wages, attendance and records handled in one place.",
    summary:
      "Payroll processing for deployed workforces — attendance to salary, with organised records — so your team spends less time on administration.",
    image: teamBriefing,
    scope: [
      "Attendance-to-salary processing",
      "Payslip preparation",
      "Statutory record keeping support",
      "Monthly workforce reports",
    ],
    process: [
      { step: "Onboard data", detail: "Collect employee and wage structures." },
      { step: "Track", detail: "Consolidate attendance each cycle." },
      { step: "Process", detail: "Calculate and prepare payroll." },
      { step: "Report", detail: "Share summaries and records." },
    ],
    suitedFor: ["Contract workforces", "SMEs", "Multi-site operations"],
  },
  {
    id: "training",
    code: "06",
    name: "Education & Training",
    short: "Building skill and discipline in security professionals.",
    summary:
      "Training that turns recruits into dependable professionals — conduct, observation, communication, emergency response and site-specific briefings.",
    image: training,
    scope: [
      "Induction training for new personnel",
      "Conduct, grooming and communication",
      "Emergency and fire response basics",
      "Site-specific briefings and refreshers",
    ],
    process: [
      { step: "Induction", detail: "Foundations of duty and conduct." },
      { step: "Practice", detail: "Drills and scenario work." },
      { step: "Site brief", detail: "Tailored to each deployment." },
      { step: "Refresh", detail: "Periodic refreshers on post." },
    ],
    suitedFor: ["New recruits", "Deployed guards", "Client in-house teams"],
  },
];

/* ---------- Industries ---------- */
export const industries: Industry[] = [
  { id: "corporate", name: "Corporate Offices & IT Parks", challenge: "Steady visitor flow, badge discipline and after-hours protection.", approach: "Front-desk trained guards, visitor registers and night patrols, backed by surveillance.", services: ["manned-guarding", "surveillance", "staffing"] },
  { id: "residential", name: "Residential Societies", challenge: "Residents expect courtesy by day and vigilance by night.", approach: "Courteous gate staff, vehicle logs, delivery management and night rounds.", services: ["manned-guarding", "surveillance"] },
  { id: "industrial", name: "Factories & Warehouses", challenge: "Large perimeters, material movement and shift changes.", approach: "Gate material checks, perimeter patrols, manpower supply and payroll for contract staff.", services: ["manned-guarding", "staffing", "payroll"] },
  { id: "healthcare", name: "Hospitals & Clinics", challenge: "Open access around the clock with sensitive areas.", approach: "Calm, trained personnel for crowd guidance, restricted zones and emergencies.", services: ["manned-guarding", "training", "staffing"] },
  { id: "education", name: "Schools & Campuses", challenge: "Protecting students while keeping campuses welcoming.", approach: "Verified staff, entry control, camera coverage and staff awareness training.", services: ["manned-guarding", "surveillance", "training"] },
  { id: "retail", name: "Retail & Events", challenge: "Footfall peaks, loss prevention and crowd safety.", approach: "Visible guarding, floor staff and inquiry support for loss incidents.", services: ["manned-guarding", "investigation", "staffing"] },
];

/* ---------- Page meta ---------- */
export const pages: Record<"home" | "about" | "services" | "industries" | "contact", PageMeta> = {
  home: { path: "/", title: "AIIF | Trained Guards, Smart Surveillance & Workforce Services in India", description: "Alliance International Integrated Force Pvt Ltd provides trained security guards, smart surveillance, investigation, staffing, payroll and training with 24/7 support." },
  about: { path: "/about", title: "About AIIF | Alliance International Integrated Force Pvt Ltd", description: "Who we are: an Indian security, investigation and education company built on discipline, training and round-the-clock support." },
  services: { path: "/services", title: "Services | Security, Surveillance, Investigation, Staffing & Payroll | AIIF", description: "Explore AIIF services: manned guarding, smart surveillance, investigation, staffing and manpower, payroll management and security training." },
  industries: { path: "/industries", title: "Industries We Serve | AIIF Security & Workforce", description: "How AIIF supports corporate offices, residential societies, factories, hospitals, campuses and retail with security and manpower." },
  contact: { path: "/contact", title: "Contact AIIF | Request a Security or Manpower Proposal", description: "Send an enquiry to AIIF about guarding, surveillance, investigation, staffing, payroll or training requirements." },
};

/* ---------- JSON-LD ---------- */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: org.legalName,
  alternateName: org.shortName,
  slogan: org.tagline,
  sameAs: [org.instagram],
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout: services.map((s) => s.name),
};

export const servicesSchema = services.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.summary,
  serviceType: s.name,
  provider: { "@type": "Organization", name: org.legalName },
  areaServed: { "@type": "Country", name: "India" },
}));
