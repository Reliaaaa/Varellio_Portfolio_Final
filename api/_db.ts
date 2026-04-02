import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

let dbInstance: Database.Database | null = null;

function resolveDbPath(): string {
  const candidates = [
    path.join(process.cwd(), "portfolio.db"),
    path.join(process.cwd(), "..", "portfolio.db"),
    path.join(process.cwd(), ".vercel", "output", "functions", "portfolio.db"),
  ];

  const foundPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!foundPath) {
    throw new Error("portfolio.db was not found in the deployed function bundle.");
  }

  return foundPath;
}

export function getDb(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = resolveDbPath();
  dbInstance = new Database(dbPath, {
    readonly: true,
    fileMustExist: true,
  });

  return dbInstance;
}
