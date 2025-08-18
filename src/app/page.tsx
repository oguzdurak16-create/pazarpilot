import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, TrendingUp, Store, LineChart, Filter } from "lucide-react";

// --- Types
export type TrendItem = {
  id: string;
  site: "Trendyol" | "Hepsiburada" | "Amazon TR" | "N11";
  title: string;
  brand?: string;
  price: number;
  currency: "TRY";
  rating?: number;
  reviews?: number;
  sellers?: number;
  category: string;
  image?: string;
  productUrl?: string;
  lastSeen: string; // ISO
  velocity7d?: number; // sales/reviews velocity proxy
};

// --- Mock chart data (replace with real query)
const velocityData = [
  { name: "P.tesi", value: 18 },
  { name: "Salı", value: 24 },
  { name: "Çarş.", value: 21 },
  { name: "Perş.", value: 30 },
  { name: "Cuma", value: 38 },
  { name: "C.tesi", value: 35 },
  { name: "Pazar", value: 40 },
];

const kpis = [
  { label: "Takip Edilen Ürün", value: "12,487", icon: <Search className="w-5 h-5" /> },
  { label: "Trend Ürün (24s)", value: "318", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Mağaza Karşılaştırması", value: "92", icon: <Store className="w-5 h-5" /> },
  { label: "A/B Özetleri", value: "41", icon: <LineChart className="w-5 h-5" /> },
];

// --- Helper
const fmtTRY = (n: number) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);

// --- Card
const Card: React.FC<{ title?: string; children: React.ReactNode; right?: React.ReactNode; className?: string }>
  = ({ title, children, right, className }) => (
  <div className={`rounded-2xl shadow-sm border border-gray-100 bg-white/80 backdrop-blur p-4 ${className ?? ""}`}>
    {(title || right) && (
      <div className="flex items-center justify-between mb-3">
        {title && <h3 className="text-sm font-semibold text-gray-700 tracking-wide">{title}</h3>}
        {right}
      </div>
    )}
    {children}
  </div>
);

// --- Tag
const Tag: React.FC<{ children: React.ReactNode }>=({ children })=> (
  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{children}</span>
);

// --- Main Component
export default function PervenaDashboard() {
  // In production, hydrate with SWR/React Query from "/api/trends"
  const items: TrendItem[] = [
    { id: "t1", site: "Trendyol", title: "Xiaomi Redmi Note 13 256GB", brand: "Xiaomi", price: 10999, currency: "TRY", rating: 4.7, reviews: 2841, sellers: 23, category: "Elektronik > Telefon", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop", productUrl: "#", lastSeen: new Date().toISOString(), velocity7d: 27 },
    { id: "t2", site: "Hepsiburada", title: "Airfryer 5.5L", brand: "Philips", price: 3999, currency: "TRY", rating: 4.6, reviews: 1254, sellers: 12, category: "Ev > Mutfak", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop", productUrl: "#", lastSeen: new Date().toISOString(), velocity7d: 18 },
    { id: "t3", site: "Amazon TR", title: "Oyuncu Kulaklık 7.1", brand: "Logitech", price: 2899, currency: "TRY", rating: 4.5, reviews: 892, sellers: 7, category: "Elektronik > Aksesuar", image: "https://images.unsplash.com/photo-1518442310709-9542a6c4b3ea?q=80&w=800&auto=format&fit=crop", productUrl: "#", lastSeen: new Date().toISOString(), velocity7d: 22 },
    { id: "t4", site: "N11", title: "Bebek Bezi Jumbo", brand: "Prima", price: 699, currency: "TRY", rating: 4.8, reviews: 5341, sellers: 16, category: "Anne & Bebek", image: "https://images.unsplash.com/photo-1609151354448-20883b7a9c0e?q=80&w=800&auto=format&fit=crop", productUrl: "#", lastSeen: new Date().toISOString(), velocity7d: 44 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Topbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-semibold text-xl tracking-tight">Pervena</div>
          <div className="hidden md:flex text-xs text-gray-500">Türkiye için güvenilir e-ticaret içgörü paneli</div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <input className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm w-64" placeholder="Ürün, marka, kategori ara" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* KPIs */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k, i)=> (
            <Card key={i}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">{k.icon}</div>
                <div>
                  <div className="text-xs text-gray-500">{k.label}</div>
                  <div className="text-lg font-semibold">{k.value}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Left column: Trend list */}
        <div className="lg:col-span-2 grid gap-4">
          <Card title="Trend Ürünler" right={<button className="text-xs px-3 py-1 rounded-lg border border-gray-200 flex items-center gap-1"><Filter className="w-3 h-3"/>Filtre</button>}>
            {/* Table */}
            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-3">Ürün</th>
                    <th className="py-2 px-3">Site</th>
                    <th className="py-2 px-3">Kategori</th>
                    <th className="py-2 px-3">Fiyat</th>
                    <th className="py-2 px-3">Puan</th>
                    <th className="py-2 px-3">Satıcı</th>
                    <th className="py-2 pl-3">Hız (7g)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it)=> (
                    <tr key={it.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-3">
                          <img src={it.image} alt="" className="w-12 h-12 rounded-xl object-cover border" />
                          <div>
                            <a href={it.productUrl} className="font-medium hover:underline">{it.title}</a>
                            <div className="text-xs text-gray-500">{it.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3"><Tag>{it.site}</Tag></td>
                      <td className="py-2 px-3 text-gray-600">{it.category}</td>
                      <td className="py-2 px-3 font-semibold">{fmtTRY(it.price)}</td>
                      <td className="py-2 px-3 text-gray-600">{it.rating ?? "-"} ({it.reviews ?? 0})</td>
                      <td className="py-2 px-3 text-gray-600">{it.sellers ?? "-"}</td>
                      <td className="py-2 pl-3"><span className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-700 border border-green-100">+{it.velocity7d}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Kategoriye Göre Hız (7g) — Top 6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={velocityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right column: Compare */}
        <div className="lg:col-span-1 grid gap-4">
          <Card title="Rakip Karşılaştırması" right={<span className="text-xs text-gray-400">son 24 saat</span>}>
            <div className="space-y-3">
              {[
                { label: "Elektronik", a: 38, b: 31 },
                { label: "Ev & Yaşam", a: 22, b: 28 },
                { label: "Anne & Bebek", a: 15, b: 19 },
              ].map((row)=> (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{row.label}</span>
                    <span>Trendyol vs Hepsiburada</span>
                  </div>
                  <div className="mt-2 grid grid-cols-12 gap-1 items-center">
                    <div className="col-span-5 h-2 rounded bg-gray-200">
                      <div className="h-2 rounded bg-gray-800" style={{ width: `${row.a}%` }} />
                    </div>
                    <div className="col-span-5 h-2 rounded bg-gray-200">
                      <div className="h-2 rounded bg-gray-800 opacity-60" style={{ width: `${row.b}%` }} />
                    </div>
                    <div className="col-span-2 text-right text-xs text-gray-600">{row.a}:{row.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="A/B Özetleri" right={<a href="#" className="text-xs text-gray-600 hover:underline">Tümünü gör</a>}>
            <div className="space-y-3">
              {[
                { test: "Airfryer 5.5L — Başlık varyasyonu", uplift: "+7.2% CTR" },
                { test: "Kulaklık — Kapak görseli A/B", uplift: "+3.1% dönüşüm" },
                { test: "Bebek Bezi — Paket seti", uplift: "+12.8% sepet" },
              ].map((t, i)=> (
                <div key={i} className="p-3 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="text-sm font-medium">{t.test}</div>
                  <div className="text-xs text-gray-600">Tahmini etki: {t.uplift}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-10 text-xs text-gray-500">
        © {new Date().getFullYear()} Pervena — Türkiye e-ticaret içgörüleri. Bu ekran demodur; gerçek veriler bağlanınca güncellenecektir.
      </footer>
    </div>
  );
}
