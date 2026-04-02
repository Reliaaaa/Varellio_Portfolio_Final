import { queryTable } from "./_db";

export default async function handler(_req: any, res: any) {
  try {
    const data = await queryTable("experience");
    res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=300");
    res.status(200).json(data);
  } catch (error) {
    console.error("/api/experience failed", error);
    res.status(500).json({ error: "Failed to load experience data." });
  }
}
