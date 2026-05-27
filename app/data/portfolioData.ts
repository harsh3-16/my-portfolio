export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  src: string;
  featured?: boolean;
  description: string;
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
  title: "Frontend Developer",
  email: "harshdhruv099@gmail.com",
  phone: "+91 8076253102",
  location: "Ghaziabad, India",
  tagline: "I assemble high-performance web applications.",
  aboutHero:
    "Frontend Developer with over 1 year of experience specializing in building responsive web applications and Shopify storefronts. I leverage modern architecture and AI-assisted workflows to create scalable, user-centric, and secure digital experiences.",
  heroText: {
    available: "Available for Work",
    aboutShort:
      "Specializing in high-performance web architecture, fluid animations, and premium digital experiences.",
  },
};

export const skillsData: SkillGroup[] = [
  {
    title: "Frontend Architecture",
    badge: "Client-Side Speed",
    description:
      "Developing highly fluid, beautiful user experiences and pixel-perfect interactive layouts.",
    color: "emerald",
    items: [
      "React.js",
      "Next.js",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Material UI",
      "Redux Toolkit",
    ],
  },
  {
    title: "Backend & DevOps",
    badge: "Scalable Systems",
    description:
      "Architecting robust, secure server layers, performance testing, and secure cloud environments.",
    color: "sky",
    items: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "Git & GitHub",
      "Postman",
      "Vercel & AWS",
    ],
  },
  {
    title: "Specialized Tools",
    badge: "Modern Workflows",
    description:
      "Accelerating deployment rates and storefront customizability with modern automated tools.",
    color: "purple",
    items: ["Shopify Liquid", "Cursor & AI", "MCP Servers", "MongoDB", "MySQL"],
  },
];

export const experienceData: Job[] = [
  {
    role: "Frontend Developer",
    company: "Cling InfoTech Works Pvt Ltd",
    location: "Ghaziabad, India",
    period: "Feb 2025 – Present",
    accentColor: "emerald",
    bullets: [
      "Engineered responsive dashboards and business web solutions using React.js and Material UI, resulting in a 30% boost in development lifecycle efficiency.",
      "Optimized application performance by implementing advanced state management with Redux Toolkit and Context API, reducing UI latency by 40%.",
      "Architected mobile-first Shopify storefronts using Liquid and OS 2.0, enhancing user engagement and mobile usability by 25%.",
      "Streamlined data integration processes by developing robust REST APIs and third-party service connections, ensuring 35% higher data reliability.",
      "Leveraged AI-assisted workflows to accelerate the implementation of payment gateways and automated messaging services.",
      "Spearheaded the design of modular, reusable components to ensure cross-project scalability and long-term maintainability.",
    ],
  },
  {
    role: "Project Coordinator",
    company: "Fluper Ltd",
    location: "Noida, India",
    period: "Aug 2024 – Jan 2025",
    accentColor: "neutral",
    bullets: [
      "Orchestrated project timelines and cross-functional stakeholder communication, ensuring timely delivery of milestones through rigorous Agile methodologies.",
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
    title: "Apex Dashboard",
    category: "Data Analytics / Admin",
    year: "2025",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    description: "A comprehensive administrative dashboard designed for real-time data monitoring and deep analytics. Engineered with advanced state management to ensure optimal rendering efficiency and featuring highly customizable interactive charts, real-time metrics tracking, and role-based access configurations.",
  },
  {
    id: 2,
    title: "Cling E-Store",
    category: "E-Commerce / Shopify Liquid",
    year: "2025",
    src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    description: "A fast, fully optimized custom Shopify storefront developed with Liquid and Online Store 2.0 architecture. Features custom section components, flexible collection layouts, fluid product transitions, and an optimized checkout experience built for maximum conversions and responsive usability.",
  },
  {
    id: 3,
    title: "Logix Portal",
    category: "Logistics SaaS / REST APIs",
    year: "2025",
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    description: "A dynamic software-as-a-service application developed to simplify complex logistics pipelines. Integrates secure REST APIs for tracking shipments in real time, managing dynamic route plans, allocating warehouse cargo efficiently, and rendering predictive logistics analytics panels.",
  },
  {
    id: 4,
    title: "Vortex App",
    category: "UI Design / Messaging Platform",
    year: "2024",
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    description: "A highly responsive, premium messaging application interface focusing on micro-interactions and smooth layout shifts. Features custom chat structures, responsive sidebar panels, real-time message state indicators, and an extensive custom iconography toolkit.",
  },
  {
    id: 5,
    title: "CareFlow Health",
    category: "Healthcare UI / Frontend",
    year: "2024",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    description: "A patient-centric portal interface built for accessible, secure medical scheduling and telehealth consultations. Stresses color contrast standards, key screen-reader elements, easy-to-use booking cards, and intuitive dashboard navigations for users of all abilities.",
  },
  {
    id: 6,
    title: "Fluper CRM",
    category: "Management SaaS / React",
    year: "2024",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    featured: false,
    description: "An operational relationship management SaaS built in React to organize complex client interactions and project lifecycles. Supports customizable contact databases, interactive pipelines, activity loggers, automated milestone emails, and granular visual metrics.",
  },
];

export const navLinks = [
  { href: "/work", title: "Work" },
  { href: "/about", title: "About" },
  { href: "/contact", title: "Contact" },
];
