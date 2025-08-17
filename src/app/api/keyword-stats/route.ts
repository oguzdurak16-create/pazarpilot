import { neon } from "@neondatabase/serverless";

type KW = { keyword: string; count: number };

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const competitorId = searchParams.get("competitor_id");
    if (!competitorId) {
      return Response.json({ error: "competitor_id required" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const rows = (await sql/* sql */`
      SELECT keyword, count
      FROM keyword_stats
      WHERE competitor_id = ${competitorId}
      ORDER BY count DESC
      LIMIT 20;
    `) as KW[];

    return Response.json(rows);
  } catch (err: unknown) {
    console.error("keyword-stats error:", err);
    return Response.json(
      { error: "internal_error", detail: getErrorMessage(err) },
      { status: 500 }
    );
  }
}
