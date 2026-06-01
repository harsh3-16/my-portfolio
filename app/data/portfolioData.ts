export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  src: string;
  featured?: boolean;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillGroup {
  title: string;
  badge: string;
  description: string;
  items: string[];
  color: "emerald" | "sky" | "purple";
}

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  accentColor: "emerald" | "neutral";
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  period: string;
  credentialId: string;
}

export const personalInfo = {
  name: "Harsh Arora",
  title: "Full-Stack Developer",
  email: "harshdhruv099@gmail.com",
  phone: "+91 8076253102",
  location: "Ghaziabad, India",
  tagline: "I build scalable full-stack systems and premium web experiences.",
  aboutHero:
    "Full-Stack Developer with 1.5+ years of experience shipping production systems across healthcare, logistics, fintech, and e-commerce. I work across the entire stack — from React frontends and Node.js APIs to real-time systems and payment integrations — and use AI tools like Claude and Cursor to ship faster without cutting corners.",
  heroText: {
    available: "Available for Work",
    aboutShort:
      "Specializing in full-stack web development, real-time systems, and premium frontend experiences.",
  },
};

export const skillsData: SkillGroup[] = [
  {
    title: "Frontend Architecture",
    badge: "Client-Side Speed",
    description:
      "Building highly fluid, responsive user interfaces with modern React patterns and animation libraries.",
    color: "emerald",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Redux Toolkit",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Backend & APIs",
    badge: "Scalable Systems",
    description:
      "Architecting robust, secure server layers with real-time capabilities and third-party integrations.",
    color: "sky",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.io",
      "JWT & bcrypt",
      "Razorpay",
      "Google OAuth",
      "AWS S3",
    ],
  },
  {
    title: "Databases & Tools",
    badge: "Modern Workflows",
    description:
      "Managing data across multiple database systems and accelerating delivery with AI-assisted workflows.",
    color: "purple",
    items: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Shopify Liquid",
      "Claude & Cursor",
      "Git & GitHub",
      "Vercel",
    ],
  },
];

export const experienceData: Job[] = [
  {
    role: "Full-Stack Developer",
    company: "Cling InfoTech Works Private Limited",
    location: "Ghaziabad, India",
    period: "Feb 2025 – Present",
    accentColor: "emerald",
    bullets: [
      "Contributed to 15+ client projects — simultaneously managing 3+ active projects spanning healthcare, logistics, fintech, e-commerce, and education.",
      "Delivered 3 backend systems covering API design, authentication, business logic, real-time features, and deployment.",
      "Progressed from feature contributor under senior guidance to primary developer on full applications within 11 months.",
      "Built and customized Shopify storefronts using Liquid, metafields, and Online Store 2.0 — live at arkadesign.co.in and shikkis.in.",
    ],
  },
  {
    role: "Project Coordinator",
    company: "Fluper Limited",
    location: "Noida, India",
    period: "Aug 2024 – Jan 2025",
    accentColor: "neutral",
    bullets: [
      "Managed delivery timelines across multi-platform client applications.",
      "Bridged communication between stakeholders and development teams for accurate requirement gathering.",
      "Drove team productivity through Agile methodologies across full project cycles.",
    ],
  },
];

export const educationData: EducationItem = {
  degree: "B.Tech in Information Technology",
  institution: "Krishna Engineering College, Ghaziabad",
  period: "2020 – 2024",
  score: "74%",
};

export const certificationData: CertificationItem = {
  title: "AWS Cloud Computing Certification",
  issuer: "Honeywell Training Academy",
  period: "2024",
  credentialId: "AWS-HW-2024",
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Théorème Ltée",
    category: "Web Development / Animation",
    year: "2026",
    src: "/projects/theoreme.png",
    featured: true,
    liveUrl: "https://theoreme-ltee.vercel.app",
    description:
      "Production website for a regulated private finance house in Mauritius, authorized by the Financial Services Commission and Bank of Mauritius. Built independently with Next.js including custom GSAP scroll animations, Lenis smooth scroll, and seamless page transitions.",
  },
  {
    id: 2,
    title: "Collaborative Task Manager",
    category: "Full-Stack / Real-Time",
    year: "2025",
    src: "/projects/ctm.png",
    featured: true,
    liveUrl: "https://ctm-eight.vercel.app",
    githubUrl: "https://github.com/harsh3-16/CTM",
    description:
      "Full-stack real-time task manager with Socket.io personal user rooms for targeted notifications. JWT authentication with bcrypt, Zod validation on both frontend and backend, Controller-Service-Repository architecture, and 23+ backend tests.",
  },
  {
    id: 3,
    title: "Vetrina Admin",
    category: "Frontend / E-Commerce",
    year: "2025",
    src: "/projects/vetrina.png",
    featured: true,
    description:
      "E-commerce admin dashboard with real-time analytics, revenue charts, and complex product catalog management featuring GST breakdown and dual rating systems. Includes inventory allocation across POD locations, order fulfillment workflows, and coupon campaign management.",
  },
  {
    id: 4,
    title: "Cutec",
    category: "Full-Stack / Healthcare",
    year: "2025",
    src: "/projects/cutec.png",
    featured: false,
    description:
      "Medicine delivery platform for a live client. Complete order lifecycle across 5 user roles — VisitPlan to Quotation to Order to Delivery. Real-time Socket.io order tracking, geolocation-based visit verification with 500m radius enforcement, and role-filtered analytics dashboards.",
  },
  {
    id: 5,
    title: "Cargo HR",
    category: "Full-Stack / Logistics",
    year: "2025",
    src: "/projects/cargohr.png",
    featured: false,
    description:
      "Employee attendance and HR management system for a logistics company. Geolocation-based punch-in/out with late arrival detection, overtime calculation beyond 9 hours, automatic cross-day shift handling, and configurable geofencing per branch office.",
  },
  {
    id: 6,
    title: "ablespace",
    category: "Full-Stack / Data",
    year: "2025",
    src: "/projects/ablespace.png",
    featured: false,
    liveUrl: "https://ablespace-cyan.vercel.app",
    githubUrl: "https://github.com/harsh3-16/ablespace",
    description:
      "On-demand product data explorer powered by live web scraping. Crawlee and Playwright fetch real product data cached in PostgreSQL with 24-hour TTL. Ethical scraping with rate limiting, exponential backoff, robots.txt compliance, and source deduplication.",
  },
];

export const navLinks = [
  { href: "/work", title: "Work" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];