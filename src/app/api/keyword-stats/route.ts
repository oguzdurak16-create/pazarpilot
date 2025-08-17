// src/app/api/keyword-stats/route.ts
import { neon } from "@neondatabase/serverless";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const competitorId = searchParams.get("competitor_id");
    if (!competitorId) {
      return Response.json({ error: "competitor_id required" }, { status: 400 });
    }
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql/*sql*/`
      SELECT keyword, count
      FROM keyword_stats
      WHERE competitor_id = ${competitorId}
      ORDER BY count DESC
      LIMIT 20;`;
    return Response.json(rows);
  } catch (err: any) {
    console.error("keyword-stats error:", err);
    return Response.json({ error: "internal_error", detail: String(err?.message || err) }, { status: 500 });
  }
}
