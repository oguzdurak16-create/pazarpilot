"use client";
import { useEffect, useState } from "react";

type Rival = { name: string; price: number; stock_level: "Düşük"|"Orta"|"Yüksek"; rating: number; change: number };
type Resp = { items: Rival[]; stats: { median: number; avg: number; undercutters: string[]; premiumers: string[] } };

export default function Rivals({ storeId }: { storeId: string }) {
  const [data, setData] = useState<Resp | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(()=>{ (async()=>{
    try{
      const r = await fetch(`/api/rivals?store_id=${storeId}`);
      if(!r.ok) throw new Error(await r.text());
      setData(await r.json());
    }catch(e:any){ setErr(String(e?.message || e)); }
  })(); },[storeId]);

  if (err) return <div className="text-sm text-red-600">Hata: {err}</div>;
  if (!data) return <div className="text-sm text-gray-500">Yükleniyor…</div>;
  if (!data.items.length) return <div className="text-sm text-gray-500">Kayıt yok.</div>;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 text-xs uppercase text-gray-500 pb-2 border-b">
        <div>Mağaza</div><div className="text-right">Fiyat</div><div className="text-right">Değişim</div><div className="text-right">Stok</div>
      </div>
      {data.items.map((r)=>(
        <div key={r.name} className="grid grid-cols-4 items-center text-sm py-2 border-b last:border-b-0">
          <div className="truncate">{r.name}</div>
          <div className="text-right">{r.price} ₺</div>
          <div className={`text-right font-medium ${r.change>=0?"text-emerald-600":"text-red-600"}`}>{r.change>=0?"+":""}{r.change} ₺</div>
          <div className="text-right text-gray-600">{r.stock_level}</div>
        </div>
      ))}

      <div className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
        <div><span className="text-gray-500">Medyan</span> <span className="font-semibold">{data.stats.median} ₺</span></div>
        <div><span className="text-gray-500">Ortalama</span> <span className="font-semibold">{data.stats.avg} ₺</span></div>
        <div><span className="text-gray-500">Agresif</span> <span className="font-semibold">{data.stats.undercutters.join(", ") || "—"}</span></div>
      </div>
    </div>
  );
}
