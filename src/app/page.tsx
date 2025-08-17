import AbSummary from "@/components/AbSummary";
import KeywordChips from "@/components/KeywordChips";

export default function Home() {
  const STORE_ID = "10000000-0000-0000-0000-000000000001";
  const COMP_ID  = "40000000-0000-0000-0000-000000000001";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-center">PazarPilot 🚀</h1>
        <p className="text-center text-gray-500 mb-6">Canlı veriye bağlı demo</p>

        <section className="space-y-3 mb-8">
          <h2 className="font-semibold">A/B Özeti</h2>
          <AbSummary storeId={STORE_ID} />
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">Rakipten Anahtar Kelimeler</h2>
          <KeywordChips competitorId={COMP_ID} />
        </section>

        <div className="mt-8 text-center text-xs text-gray-500">
          Banner alanı (reklam)
        </div>
      </div>
    </main>
  );
}
