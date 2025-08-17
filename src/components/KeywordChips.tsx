"use client";
import { useEffect, useState } from "react";

type KW = { keyword: string; count: number };

export default function KeywordChips({ competitorId }: { competitorId: string }) {
  const [rows, setRows] = useState<KW[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/keyword-stats?competitor_id=${competitorId}`);
        if (!r.ok) throw new Error(await r.text());
        const data: KW[] = await r.json();
        setRows(data);
      } catch (e: any) {
        setErr(e?.message || "error");
      }
    })();
  }, [competitorId]);

  if (err) return <div className="text-sm text-red-600">Hata: {err}</div>;
  if (!rows) return <div className="text-sm text-gray-500">Yükleniyor…</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">Kayıt yok.</div>;

  return (
    <div className="flex flex-wrap gap-2">
      {rows.map((k) => (
        <span key={k.keyword} className="px-2 py-1 text-xs rounded-full bg-gray-100 border text-gray-700">
          {k.keyword} <span className="opacity-60">×{k.count}</span>
        </span>
      ))}
    </div>
  );
}
