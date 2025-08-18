import { neon } from "@neondatabase/serverless";

type Rival = {
  name: string;
  price: number;
  stock_level: "Düşük" | "Orta" | "Yüksek";
  rating: number;
  change: number;
};

type RivalResp = {
  items: Rival[];
  stats: { median: number; avg: number; undercutters: string[]; premiumers: string[] };
};

function median(nums: number[]): number {
  const arr = [...nums].sort((a,b)=>a-b);
  const n = arr.length;
  if (!n) return 0;
  return n % 2 ? arr[(n-1)/2] : (arr[n/2-1] + arr[n/2]) / 2;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storeId = searchParams.get("store_id");
  if (!storeId) return Response.json({ error: "store_id required" }, { status: 400 });

  const sql = neon(process.env.DATABASE_URL!);
  const rows = await sql/*sql*/`
    SELECT name, price::float8 as price, stock_level, rating::float8 as rating, change::float8 as change
    FROM rivals
    WHERE store_id = ${storeId}
    ORDER BY price ASC;
  ` as Rival[];

  const prices = rows.map(r=>r.price);
  const med = median(prices);
  const avg = prices.length ? Math.round((prices.reduce((a,b)=>a+b,0)/prices.length)) : 0;
  const undercutters = rows.filter(r => r.price < avg*0.95).map(r=>r.name);
  const premiumers = rows.filter(r => r.price > avg*1.10).map(r=>r.name);

  const resp: RivalResp = { items: rows, stats: { median: Math.round(med), avg, undercutters, premiumers } };
  return Response.json(resp);
}
