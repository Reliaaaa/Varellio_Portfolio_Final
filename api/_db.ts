import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fallbackTableData, type TableName } from "./fallbackData";

type DbLike = {
  prepare: (query: string) => {
    all: () => unknown[];
  };
};

let dbInstance: DbLike | null = null;
let dbInitAttempted = false;

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

function resolveDbPath(): string {
  const candidates = [
    path.join(process.cwd(), "portfolio.db"),
    path.join(process.cwd(), "..", "portfolio.db"),
    path.join(moduleDir, "portfolio.db"),
    path.join(moduleDir, "..", "portfolio.db"),
    path.join(process.cwd(), ".vercel", "output", "functions", "portfolio.db"),
  ];

  const foundPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (!foundPath) {
    throw new Error("portfolio.db was not found in the deployed function bundle.");
  }

  return foundPath;
}

async function getDb(): Promise<DbLike> {
  if (dbInstance) {
    return dbInstance;
  }

  if (dbInitAttempted) {
    throw new Error("SQLite database is unavailable in this runtime.");
  }

  dbInitAttempted = true;

  const sqliteModule = await import("better-sqlite3");
  const BetterSqlite3 = sqliteModule.default as unknown as new (
    fileName: string,
    options: { readonly: boolean; fileMustExist: boolean }
  ) => DbLike;

  const dbPath = resolveDbPath();
  dbInstance = new BetterSqlite3(dbPath, {
    readonly: true,
    fileMustExist: true,
  });

  return dbInstance;
}

export async function queryTable(table: TableName): Promise<unknown[]> {
  const query = `SELECT * FROM ${table} ORDER BY id ASC`;

  try {
    const db = await getDb();
    return db.prepare(query).all();
  } catch (error) {
    console.error(`SQLite query failed for ${table}, using fallback data.`, error);
    return fallbackTableData[table];
  }
}
