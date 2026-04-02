import initSqlJs from 'sql.js';

type SqlJsDatabase = Awaited<ReturnType<typeof initSqlJs>> extends { Database: new (...args: unknown[]) => infer D } ? D : never;

let db: SqlJsDatabase | null = null;

const DATA_KEY = 'portfolio_sqlite_db';

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year TEXT,
    title TEXT,
    company TEXT,
    tags TEXT
  );
  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
  );
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    year TEXT,
    description TEXT,
    image_url TEXT
  );
`;

const SEED_DATA = {
  experience: [
    { year: "2025 - Present", title: "Part-Time Stock Retailer", company: "Self-Taught", tags: "Home" },
    { year: "2024 - Present", title: "Part-Time Forex Trader", company: "Self-Taught", tags: "Home" },
    { year: "2019 - Present", title: "Tech Enthusiast", company: "Self-Taught", tags: "Home" },
    { year: "2025 - 2026", title: "Treasuer", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
    { year: "2025", title: "Operator", company: "Frateran Cup XXV", tags: "Catholic Highschool Frateran Surabaya" },
    { year: "2025", title: "Operator", company: "Frateran Solve the Case", tags: "Catholic Highschool Frateran Surabaya" },
    { year: "2025", title: "2nd Winner Digital Bussiness Competition", company: "University of Widya Mandala", tags: "Achievement" },
    { year: "2024", title: "Part-Time Bitcoin Trader", company: "Self Taught", tags: "Home" },
    { year: "2024", title: "Excecutive Chair of Frateran Share & Care", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
    { year: "2024 - 2025", title: "Social & Public Relations", company: "Student Council", tags: "Catholic Highschool Frateran Surabaya" },
    { year: "2023", title: "Test Writers & Proctors", company: "Frateran Solve the Case", tags: "Catholic Highschool Frateran Surabaya" }
  ],
  skills: [
    { name: "Bussiness Analysis", category: "Finance" },
    { name: "Financial Accounting", category: "Finance" },
    { name: "Financial Management", category: "Finance" },
    { name: "Stock Retail", category: "Finance" },
    { name: "Trading", category: "Finance" },
    { name: "Event Production", category: "Soft Skills" },
    { name: "C++ Coder", category: "Soft Skills" },
    { name: "Communication", category: "Soft Skills" },
    { name: "Public Relations", category: "Soft Skills" },
    { name: "Python Coder", category: "Soft Skills" },
    { name: "Relationship Building", category: "Soft Skills" },
    { name: "Social Media Communications", category: "Soft Skills" },
    { name: "Canva", category: "Tools" },
    { name: "Microsoft Excel", category: "Tools" },
    { name: "Microsoft Word", category: "Tools" }
  ],
  projects: [
    {
      title: "Digital Business Competition",
      category: "Achievement / Business",
      year: "2025",
      description: "Achieved 2nd place in the Digital Business Competition at the University of Widya Mandala, demonstrating strong business analysis and financial management skills.",
      image_url: "/wmag.jpg"
    },
    {
      title: "Frateran Share & Care",
      category: "Leadership / Event",
      year: "2024",
      description: "Served as the Executive Chair for the Frateran Share & Care event, managing social and public relations for the Student Council at Catholic Highschool Frateran Surabaya.",
      image_url: "/shercer.jpg"
    },
    {
      title: "Frateran Cup XXV & Solve the Case",
      category: "Event Production",
      year: "2023 - 2025",
      description: "Acted as a Treasurer, Operator, Test Writer, and Proctor for major school events including Frateran Cup XXV and Frateran Solve the Case.",
      image_url: "/fratcup.jpg"
    },
    {
      title: "Personal Trading Portfolio",
      category: "Finance / Trading",
      year: "2024 - Present",
      description: "Active part-time trader in Stock Retail, Forex, and Bitcoin, applying self-taught financial accounting and market analysis strategies.",
      image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000"
    }
  ]
};

export async function initDatabase(): Promise<SqlJsDatabase> {
  if (db) return db;

  const wasmBinary = await fetch('/sql-wasm.wasm').then(res => res.arrayBuffer());
  const SQL = await initSqlJs({
    wasmBinary
  });

  const savedData = localStorage.getItem(DATA_KEY);
  if (savedData) {
    try {
      const buffer = Uint8Array.from(atob(savedData), c => c.charCodeAt(0));
      db = new SQL.Database(buffer);
    } catch (e) {
      console.error('Failed to load saved database, creating new one:', e);
      db = new SQL.Database();
      db.run(SCHEMA);
      seedDatabase();
      saveDatabase();
    }
  } else {
    db = new SQL.Database();
    db.run(SCHEMA);
    seedDatabase();
    saveDatabase();
  }

  return db;
}

function seedDatabase() {
  if (!db) return;

  SEED_DATA.experience.forEach(exp => {
    db!.run(
      "INSERT INTO experience (year, title, company, tags) VALUES (?, ?, ?, ?)",
      [exp.year, exp.title, exp.company, exp.tags]
    );
  });

  SEED_DATA.skills.forEach(skill => {
    db!.run(
      "INSERT INTO skills (name, category) VALUES (?, ?)",
      [skill.name, skill.category]
    );
  });

  SEED_DATA.projects.forEach(project => {
    db!.run(
      "INSERT INTO projects (title, category, year, description, image_url) VALUES (?, ?, ?, ?, ?)",
      [project.title, project.category, project.year, project.description, project.image_url]
    );
  });
}

export function saveDatabase() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = btoa(String.fromCharCode(...data));
    localStorage.setItem(DATA_KEY, buffer);
  } catch (e) {
    console.error('Failed to save database:', e);
  }
}

function queryTable(table: string) {
  if (!db) return [];
  const result = db.exec(`SELECT * FROM ${table} ORDER BY id ASC`);
  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map(row => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

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

export async function getExperience(): Promise<Experience[]> {
  await initDatabase();
  return queryTable('experience') as Experience[];
}

export async function getSkills(): Promise<Skill[]> {
  await initDatabase();
  return queryTable('skills') as Skill[];
}

export async function getProjects(): Promise<Project[]> {
  await initDatabase();
  return queryTable('projects') as Project[];
}
