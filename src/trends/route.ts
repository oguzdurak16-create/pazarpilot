import { neon } from "@neondatabase/serverless";

export type TrendRow = {
  id: string;
  title: string;
  demand_index: number;
  competition_index: number;
  price_elasticity: number;
  rating_count_growth: number;
  return_rate: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("store_id");
  if (!storeId) return Response.json({ error: "store_id required" }, { status: 400 });

  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql/*sql*/`
    SELECT id::text, title, demand_index, competition_index, price_elasticity, rating_count_growth, return_rate
    FROM trend_signals
    WHERE store_id = ${storeId}
    ORDER BY created_at DESC, title ASC
    LIMIT 20;
  ` as TrendRow[];

  return Response.json(rows);
}
