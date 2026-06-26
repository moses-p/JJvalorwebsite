import DynamicProductsGrid from "@/components/DynamicProductsGrid";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Marketplace</h1>
        <p className="text-lg text-gray-600 mb-8">Shop our products and support J.J Valor initiatives</p>
        <DynamicProductsGrid />
      </div>
    </div>
  );
}
