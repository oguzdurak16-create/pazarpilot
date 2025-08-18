import AbSummary from "@/components/AbSummary";
import KeywordChips from "@/components/KeywordChips";
import AdSlot from "@/components/AdSlot";
import Rivals from "@/components/Rivals";
import TrendRadar from "@/components/TrendRadar";
import ProfitCalc from "@/components/ProfitCalc";

export default function Home() {
  // Seed’teki sabit ID’ler
  const STORE_ID = "10000000-0000-0000-0000-000000000001";
  const COMP_ID  = "40000000-0000-0000-0000-000000000001";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Topbar */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-3">
          <div className="font-extrabold text-xl tracking-tight">Pervena <span className="text-gray-400">Free</span></div>
          <div className="text-xs text-gray-500">Reklam destekli</div>
        </div>
        <div className="max-w-7xl mx-auto px-3 pb-2">
          <AdSlot id="banner-top" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-6">
          {/* Trend Radar (Neon) */}
          <section className="space-y-3">
            <h2 className="font-semibold">Trend Radar</h2>
            <TrendRadar storeId={STORE_ID}/>
          </section>

          {/* A/B Özeti (Neon) */}
          <section className="space-y-3">
            <h2 className="font-semibold">A/B Raporu</h2>
            <AbSummary storeId={STORE_ID} />
          </section>

          {/* Rakip Gözcü (Neon) */}
          <section className="space-y-3">
            <h2 className="font-semibold">Rakip Gözcü</h2>
            <Rivals storeId={STORE_ID} />
          </section>

          {/* KW Önerileri (Neon) */}
          <section className="space-y-3">
            <h2 className="font-semibold">Anahtar Kelime Önerileri</h2>
            <KeywordChips competitorId={COMP_ID} />
          </section>

          {/* Kâr Hesaplayıcı (client) */}
          <section className="space-y-3">
            <h2 className="font-semibold">Kâr Hesaplayıcı</h2>
            <ProfitCalc />
          </section>
        </div>

        {/* Right rail ads */}
        <div className="space-y-4 lg:sticky lg:top-[76px] h-max">
          <AdSlot id="sidebar-1"/>
          <AdSlot id="sidebar-2"/>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto p-4 space-y-3">
        <div className="text-xs text-gray-500">© {new Date().getFullYear()} Pervena. Reklamlarla ücretsiz.</div>
        <AdSlot id="banner-footer"/>
      </footer>
    </main>
  );
}
