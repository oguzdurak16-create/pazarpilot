"use client";
import { useEffect, useMemo, useState } from "react";

type TrendRow = {
  id: string;
  title: string;
  demand_index: number;
  competition_index: number;
  price_elasticity: number;
  rating_count_growth: number;
  return_rate: number;
};

function computeScore(s: TrendRow) {
  const w = { demand: 0.35, comp: 0.25, elast: 0.15, growth: 0.15, ret: 0.10 };
  const demand = s.demand_index/100;
  const comp = 1 - s.competition_index/100;
  const elast = s.price_elasticity;
  const growth = (s.rating_count_growth + 1)/2;
  const ret = 1 - s.return_rate;
  let raw = demand*w.demand + comp*w.comp + elast*w.elast + growth*w.growth + ret*w.ret;
  if (s.return_rate>0.15) raw -= 0.08;
  if (s.demand_index>70 && s.competition_index<30) raw += 0.06;
  const score = Math.max(0, Math.min(100, Math.round(raw*100)));
  const tags:string[] = [];
  if (s.return_rate < 0.05) tags.push("Düşük iade");
  if (s.rating_count_growth > 0.2) tags.push("Yorum ↑");
  if (s.competition_index < 35) tags.push("Düşük rekabet");
  if (s.demand_index > 70) tags.push("Arama ↑");
  const priceHint = s.price_elasticity > 0.6 ? "Fiyatı alt %40 bandında test et" : "Fiyatı ortalamaya yakın tut";
  return { score, tags, priceHint };
}

export default function TrendRadar({ storeId }: { storeId: string }) {
  const [rows, setRows] = useState<TrendRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(()=>{ (async()=>{
    try{
      const r = await fetch(`/api/trends?store_id=${storeId}`);
      if(!r.ok) throw new Error(await r.text());
      setRows(await r.json());
    }catch(e:any){ setErr(String(e?.message||e)); }
  })(); },[storeId]);

  if (err) return <div className="text-sm text-red-600">Hata: {err}</div>;
  if (!rows) return <div className="text-sm text-gray-500">Yükleniyor…</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">Kayıt yok.</div>;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {rows.slice(0,3).map(r=>{
        const x = computeScore(r);
        return (
          <div key={r.id} className="group hover:shadow-md transition-shadow border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{r.title}</div>
              <span className="text-xs bg-gray-100 border rounded-full px-2 py-0.5">Skor {x.score}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {x.tags.map(t=><span key={t} className="px-2 py-1 text-xs rounded-full bg-gray-100 border">{t}</span>)}
            </div>
            <div className="text-sm text-gray-600">{x.priceHint}</div>
          </div>
        );
      })}
    </div>
  );
}
