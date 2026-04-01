import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("portfolio.db");

db.exec(`
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
`);

const experienceCount = db.prepare("SELECT count(*) as count FROM experience").get() as { count: number };
if (experienceCount.count === 0) {
  const insertExp = db.prepare("INSERT INTO experience (year, title, company, tags) VALUES (?, ?, ?, ?)");
  insertExp.run("2025 — Present", "Part-Time Stock Retailer", "Self-Taught", "Home");
  insertExp.run("2024 — Present", "Part-Time Forex Trader", "Self-Taught", "Home");
  insertExp.run("2019 — Present", "Tech Enthusiast", "Self-Taught", "Home");
  insertExp.run("2025 — 2026", "Treasuer", "Student Council", "Catholic Highschool Frateran Surabaya");
  insertExp.run("2025", "Operator", "Frateran Cup XXV", "Catholic Highschool Frateran Surabaya");
  insertExp.run("2025", "Operator", "Frateran Solve the Case", "Catholic Highschool Frateran Surabaya");
  insertExp.run("2025", "2nd Winner Digital Bussiness Competition", "University of Widya Mandala", "Achievement");
  insertExp.run("2024", "Part-Time Bitcoin Trader", "Self Taught", "Home");
  insertExp.run("2024", "Excecutive Chair of Frateran Share & Care", "Student Council", "Catholic Highschool Frateran Surabaya");
  insertExp.run("2024 — 2025", "Social & Public Relations", "Student Council", "Catholic Highschool Frateran Surabaya");
  insertExp.run("2023", "Test Writers & Proctors", "Frateran Solve the Case", "Catholic Highschool Frateran Surabaya");

  const insertSkill = db.prepare("INSERT INTO skills (name, category) VALUES (?, ?)");
  insertSkill.run("Bussiness Analysis", "Finance");
  insertSkill.run("Financial Accounting", "Finance");
  insertSkill.run("Financial Management", "Finance");
  insertSkill.run("Stock Retail", "Finance");
  insertSkill.run("Trading", "Finance");
  insertSkill.run("Event Production", "Soft Skills");
  insertSkill.run("C++ Coder", "Soft Skills");
  insertSkill.run("Communication", "Soft Skills");
  insertSkill.run("Public Relations", "Soft Skills");
  insertSkill.run("Python Coder", "Soft Skills");
  insertSkill.run("Relationship Building", "Soft Skills");
  insertSkill.run("Social Media Communications", "Soft Skills");
  insertSkill.run("Canva", "Tools");
  insertSkill.run("Microsoft Excel", "Tools");
  insertSkill.run("Microsoft Word", "Tools");

  const insertProject = db.prepare("INSERT INTO projects (title, category, year, description, image_url) VALUES (?, ?, ?, ?, ?)");
  insertProject.run(
    "Digital Business Competition",
    "Achievement / Business",
    "2025",
    "Achieved 2nd place in the Digital Business Competition at the University of Widya Mandala, demonstrating strong business analysis and financial management skills.",
    "/wmag.jpg"
  );
  insertProject.run(
    "Frateran Share & Care",
    "Leadership / Event",
    "2024",
    "Served as the Executive Chair for the Frateran Share & Care event, managing social and public relations for the Student Council at Catholic Highschool Frateran Surabaya.",
    "/shercer.jpg"
  );
  insertProject.run(
    "Frateran Cup XXV & Solve the Case",
    "Event Production",
    "2023 - 2025",
    "Acted as an Treasure, Operator, Test Writer, and Proctor for major school events including Frateran Cup XXV and Frateran Solve the Case.",
    "/fratcup.jpg"
  );
  insertProject.run(
    "Personal Trading Portfolio",
    "Finance / Trading",
    "2024 - Present",
    "Active part-time trader in Stock Retail, Forex, and Bitcoin, applying self-taught financial accounting and market analysis strategies.",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/experience", (req, res) => {
    const data = db.prepare("SELECT * FROM experience ORDER BY id ASC").all();
    res.json(data);
  });

  app.get("/api/skills", (req, res) => {
    const data = db.prepare("SELECT * FROM skills").all();
    res.json(data);
  });

  app.get("/api/projects", (req, res) => {
    const data = db.prepare("SELECT * FROM projects").all();
    res.json(data);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
