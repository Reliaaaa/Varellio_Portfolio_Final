export interface Experience {
  id: number;
  year: string;
  title: string;
  company: string;
  tags: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image_url: string;
}

export const experienceData: Experience[] = [
  { id: 1, year: "2025 — Present", title: "Part-Time Stock Retailer", company: "Self-Taught", tags: "Home" },
  { id: 2, year: "2024 — Present", title: "Part-Time Forex Trader", company: "Self-Taught", tags: "Home" },
  { id: 3, year: "2019 — Present", title: "Tech Enthusiast", company: "Self-Taught", tags: "Home" },
  { id: 4, year: "2025 — 2026", title: "Treasuer", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
  { id: 5, year: "2025", title: "Operator", company: "Frateran Cup XXV", tags: "Catholic Highschool Frateran Surabaya" },
  { id: 6, year: "2025", title: "Operator", company: "Frateran Solve the Case", tags: "Catholic Highschool Frateran Surabaya" },
  { id: 7, year: "2025", title: "2nd Winner Digital Bussiness Competition", company: "University of Widya Mandala", tags: "Achievement" },
  { id: 8, year: "2024", title: "Part-Time Bitcoin Trader", company: "Self Taught", tags: "Home" },
  { id: 9, year: "2024", title: "Excecutive Chair of Frateran Share & Care", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
  { id: 10, year: "2024 — 2025", title: "Social & Public Relations", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
  { id: 11, year: "2023", title: "Test Writers & Proctors", company: "Frateran Solve the Case", tags: "Catholic Highschool Frateran Surabaya" },
];

export const skillsData: Skill[] = [
  { id: 1, name: "Bussiness Analysis", category: "Finance" },
  { id: 2, name: "Financial Accounting", category: "Finance" },
  { id: 3, name: "Financial Management", category: "Finance" },
  { id: 4, name: "Stock Retail", category: "Finance" },
  { id: 5, name: "Trading", category: "Finance" },
  { id: 6, name: "Event Production", category: "Soft Skills" },
  { id: 7, name: "C++ Coder", category: "Soft Skills" },
  { id: 8, name: "Communication", category: "Soft Skills" },
  { id: 9, name: "Public Relations", category: "Soft Skills" },
  { id: 10, name: "Python Coder", category: "Soft Skills" },
  { id: 11, name: "Relationship Building", category: "Soft Skills" },
  { id: 12, name: "Social Media Communications", category: "Soft Skills" },
  { id: 13, name: "Canva", category: "Tools" },
  { id: 14, name: "Microsoft Excel", category: "Tools" },
  { id: 15, name: "Microsoft Word", category: "Tools" },
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Digital Business Competition",
    category: "Achievement / Business",
    year: "2025",
    description: "Achieved 2nd place in the Digital Business Competition at the University of Widya Mandala, demonstrating strong business analysis and financial management skills.",
    image_url: "/wmag.jpg"
  },
  {
    id: 2,
    title: "Frateran Share & Care",
    category: "Leadership / Event",
    year: "2024",
    description: "Served as the Executive Chair for the Frateran Share & Care event, managing social and public relations for the Student Council at Catholic Highschool Frateran Surabaya.",
    image_url: "/shercer.jpg"
  },
  {
    id: 3,
    title: "Frateran Cup XXV & Solve the Case",
    category: "Event Production",
    year: "2023 - 2025",
    description: "Acted as an Treasure, Operator, Test Writer, and Proctor for major school events including Frateran Cup XXV and Frateran Solve the Case.",
    image_url: "/fratcup.jpg"
  },
  {
    id: 4,
    title: "Personal Trading Portfolio",
    category: "Finance / Trading",
    year: "2024 - Present",
    description: "Active part-time trader in Stock Retail, Forex, and Bitcoin, applying self-taught financial accounting and market analysis strategies.",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000"
  }
];
