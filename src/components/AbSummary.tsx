"use client";
import { useEffect, useState } from "react";

type Row = {
  version: string;
  impressions: number;
  clicks: number;
  add_to_cart: number;
  orders: number;
  revenue: string | number;
};

export default function AbSummary({ storeId }: { storeId: string }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/ab-summary?store_id=${storeId}`);
        if (!r.ok) throw new Error(await r.text());
        const data: Row[] = await r.json();
        setRows(data);
      } catch (e: any) {
        setErr(e?.message || "error");
      }
    })();
  }, [storeId]);

  if (err) return <div className="text-sm text-red-600">Hata: {err}</div>;
  if (!rows) return <div className="text-sm text-gray-500">Yükleniyor…</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">Kayıt yok.</div>;

  const fmt = (n: any) => new Intl.NumberFormat("tr-TR").format(Number(n));

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 text-left">Varyant</th>
            <th className="p-2 text-right">Gösterim</th>
            <th className="p-2 text-right">Tıklama</th>
            <th className="p-2 text-right">Sepete</th>
            <th className="p-2 text-right">Sipariş</th>
            <th className="p-2 text-right">Ciro (₺)</th>
            <th className="p-2 text-right">CTR %</th>
            <th className="p-2 text-right">CVR %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const ctr = r.impressions ? (r.clicks * 100) / r.impressions : 0;
            const cvr = r.clicks ? (r.orders * 100) / r.clicks : 0;
            return (
              <tr key={r.version} className="border-t">
                <td className="p-2 font-medium">{r.version}</td>
                <td className="p-2 text-right">{fmt(r.impressions)}</td>
                <td className="p-2 text-right">{fmt(r.clicks)}</td>
                <td className="p-2 text-right">{fmt(r.add_to_cart)}</td>
                <td className="p-2 text-right">{fmt(r.orders)}</td>
                <td className="p-2 text-right">{fmt(r.revenue)}</td>
                <td className="p-2 text-right">{ctr.toFixed(1)}</td>
                <td className="p-2 text-right">{cvr.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-[11px] text-gray-500 mt-2">
        Kaynak: /api/ab-summary — demo store: {storeId.slice(0,8)}…
      </div>
    </div>
  );
}
