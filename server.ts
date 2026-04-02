import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const isVercel = process.env.VERCEL === "1";
const dbPath = "portfolio.db";
const db = new Database(dbPath);

async function initializeDatabase() {
  await db.exec(`
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

  const experienceCount = await db.prepare("SELECT count(*) as count FROM experience").get() as { count: number };
  if (experienceCount.count === 0) {
    const insertExp = await db.prepare("INSERT INTO experience (year, title, company, tags) VALUES (?, ?, ?, ?)");
    await insertExp.run("2025 — Present", "Part-Time Stock Retailer", "Self-Taught", "Home");
    await insertExp.run("2024 — Present", "Part-Time Forex Trader", "Self-Taught", "Home");
    await insertExp.run("2019 — Present", "Tech Enthusiast", "Self-Taught", "Home");
    await insertExp.run("2025 — 2026", "Treasuer", "Student Council", "Catholic Highschool Frateran Surabaya");
    await insertExp.run("2025", "Operator", "Frateran Cup XXV", "Catholic Highschool Frateran Surabaya");
    await insertExp.run("2025", "Operator", "Frateran Solve the Case", "Catholic Highschool Frateran Surabaya");
    await insertExp.run("2025", "2nd Winner Digital Bussiness Competition", "University of Widya Mandala", "Achievement");
    await insertExp.run("2024", "Part-Time Bitcoin Trader", "Self Taught", "Home");
    await insertExp.run("2024", "Excecutive Chair of Frateran Share & Care", "Student Council", "Catholic Highschool Frateran Surabaya");
    await insertExp.run("2024 — 2025", "Social & Public Relations", "Student Council", "Catholic Highschool Frateran Surabaya");
    await insertExp.run("2023", "Test Writers & Proctors", "Frateran Solve the Case", "Catholic Highschool Frateran Surabaya");
  }

  const skillsCount = await db.prepare("SELECT count(*) as count FROM skills").get() as { count: number };
  if (skillsCount.count === 0) {
    const insertSkill = await db.prepare("INSERT INTO skills (name, category) VALUES (?, ?)");
    await insertSkill.run("Bussiness Analysis", "Finance");
    await insertSkill.run("Financial Accounting", "Finance");
    await insertSkill.run("Financial Management", "Finance");
    await insertSkill.run("Stock Retail", "Finance");
    await insertSkill.run("Trading", "Finance");
    await insertSkill.run("Event Production", "Soft Skills");
    await insertSkill.run("C++ Coder", "Soft Skills");
    await insertSkill.run("Communication", "Soft Skills");
    await insertSkill.run("Public Relations", "Soft Skills");
    await insertSkill.run("Python Coder", "Soft Skills");
    await insertSkill.run("Relationship Building", "Soft Skills");
    await insertSkill.run("Social Media Communications", "Soft Skills");
    await insertSkill.run("Canva", "Tools");
    await insertSkill.run("Microsoft Excel", "Tools");
    await insertSkill.run("Microsoft Word", "Tools");
  }

  const projectsCount = await db.prepare("SELECT count(*) as count FROM projects").get() as { count: number };
  if (projectsCount.count === 0) {
    const insertProject = await db.prepare("INSERT INTO projects (title, category, year, description, image_url) VALUES (?, ?, ?, ?, ?)");
    await insertProject.run(
      "Digital Business Competition",
      "Achievement / Business",
      "2025",
      "Achieved 2nd place in the Digital Business Competition at the University of Widya Mandala, demonstrating strong business analysis and financial management skills.",
      "/wmag.jpg"
    );
    await insertProject.run(
      "Frateran Share & Care",
      "Leadership / Event",
      "2024",
      "Served as the Executive Chair for the Frateran Share & Care event, managing social and public relations for the Student Council at Catholic Highschool Frateran Surabaya.",
      "/shercer.jpg"
    );
    await insertProject.run(
      "Frateran Cup XXV & Solve the Case",
      "Event Production",
      "2023 - 2025",
      "Acted as an Treasurer, Operator, Test Writer, and Proctor for major school events including Frateran Cup XXV and Frateran Solve the Case.",
      "/fratcup.jpg"
    );
    await insertProject.run(
      "Personal Trading Portfolio",
      "Finance / Trading",
      "2024 - Present",
      "Active part-time trader in Stock Retail, Forex, and Bitcoin, applying self-taught financial accounting and market analysis strategies.",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000"
    );
  }
}
const app = express();

app.use(express.json());

app.get("/api/experience", (req, res) => {
  const data = db.prepare("SELECT * FROM experience ORDER BY id ASC").all();
  res.json(data);
});

app.get("/api/skills", (req, res) => {
  const data = db.prepare("SELECT * FROM skills ORDER BY id ASC").all();
  res.json(data);
});

app.get("/api/projects", (req, res) => {
  const data = db.prepare("SELECT * FROM projects ORDER BY id ASC").all();
  res.json(data);
});

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Jika TIDAK berjalan di Vercel, jalankan server seperti biasa (untuk AI Studio / Local)
if (!isVercel) {
  startServer();
}

// Export app untuk Vercel Serverless Function
export default app;
