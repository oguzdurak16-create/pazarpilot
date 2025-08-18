"use client";
import { useMemo, useState } from "react";

type Input = { price:number; cost:number; commissionPct:number; shipping:number; adPerOrder:number; vatPct:number };
function compute(p: Input){
  const netPrice = p.price / (1 + p.vatPct/100);
  const commission = netPrice * (p.commissionPct/100);
  const net = netPrice - commission - p.shipping - p.adPerOrder - p.cost;
  const marginPct = (net / Math.max(1,netPrice)) * 100;
  const roas = net>0 && p.adPerOrder>0 ? (netPrice/p.adPerOrder) : (net>0?999:0);
  const range:[number,number] = [Math.round(p.price*0.95), Math.round(p.price*1.05)];
  return { net: Math.round(net), marginPct: Math.round(marginPct), roas: Math.round(roas*10)/10, range };
}

export default function ProfitCalc(){
  const [p, setP] = useState<Input>({ price:399, cost:220, commissionPct:12, shipping:49, adPerOrder:18, vatPct:20 });
  const r = useMemo(()=>compute(p),[p]);
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          {label:"Satış Fiyatı (₺)", key:"price"},
          {label:"Ürün Maliyeti (₺)", key:"cost"},
          {label:"Komisyon (%)",      key:"commissionPct"},
          {label:"Kargo (₺)",         key:"shipping"},
          {label:"Sipariş Başı Reklam (₺)", key:"adPerOrder"},
          {label:"KDV (%)",           key:"vatPct"},
        ].map((f)=>(
          <label key={f.key} className="text-sm grid gap-1">
            {f.label}
            <input type="number" className="border rounded-lg p-2" value={(p as any)[f.key]}
              onChange={(e)=>setP({...p, [f.key]:Number(e.target.value)})}/>
          </label>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="border rounded-xl p-3"><div className="text-xs text-gray-500">Net Kâr</div><div className="text-2xl font-bold">{r.net} ₺</div></div>
        <div className="border rounded-xl p-3"><div className="text-xs text-gray-500">Kâr Marjı</div><div className="text-2xl font-bold">{r.marginPct}%</div></div>
        <div className="border rounded-xl p-3"><div className="text-xs text-gray-500">Tahmini ROAS</div><div className="text-2xl font-bold">{r.roas}x</div></div>
      </div>
      <div className="text-xs text-gray-500">Öneri: Fiyatı {r.range[0]}–{r.range[1]} ₺ bandında test edin.</div>
    </div>
  );
}
