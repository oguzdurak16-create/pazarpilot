import { neon } from "@neondatabase/serverless";

type AbRow = {
  version: string;
  impressions: number;
  clicks: number;
  add_to_cart: number;
  orders: number;
  revenue: string | number;
};

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("store_id");
    if (!storeId) {
      return Response.json({ error: "store_id required" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const rows = (await sql/* sql */`
      SELECT
        l.version,
        SUM(COALESCE(m.impressions,0))::int AS impressions,
        SUM(COALESCE(m.clicks,0))::int      AS clicks,
        SUM(COALESCE(m.add_to_cart,0))::int AS add_to_cart,
        SUM(COALESCE(m.orders,0))::int      AS orders,
        COALESCE(SUM(m.revenue),0)::numeric AS revenue
      FROM listings l
      JOIN products p ON p.id = l.product_id
      LEFT JOIN listing_metrics m ON m.listing_id = l.id
      WHERE p.store_id = ${storeId}
      GROUP BY l.version
      ORDER BY l.version ASC;
    `) as AbRow[];

    return Response.json(rows);
  } catch (err: unknown) {
    console.error("ab-summary error:", err);
    return Response.json(
      { error: "internal_error", detail: getErrorMessage(err) },
      { status: 500 }
    );
  }
}
