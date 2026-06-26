"use client";

import { useCallback, useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getPublicProducts, type Product } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

export default function DynamicProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setProducts(await getPublicProducts());
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  if (loading) {
    return <p className="text-center text-gray-500 py-12">Loading products...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-12 text-center">
        <p className="text-gray-600">Products coming soon. Add items from the admin panel to display them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <article key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          {product.images ? (
            <img src={resolveImageUrl(product.images)} alt={product.name} className="w-full h-44 object-cover" />
          ) : (
            <div className="w-full h-44 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          )}
          <div className="p-5">
            {product.category && (
              <span className="text-xs uppercase tracking-wide text-blue-600 font-semibold">{product.category}</span>
            )}
            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">{product.name}</h3>
            {product.description && <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>}
            <p className="text-xl font-bold text-blue-700">
              {product.currency} {product.price.toLocaleString()}
            </p>
            {product.stock_quantity <= 0 && (
              <span className="inline-block mt-2 text-xs text-red-600 font-medium">Out of stock</span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
