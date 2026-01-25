"use client";

import { useEffect, useState } from "react";
import SellerProductCard from "@/components/SellerProductCard";
import type { Product } from "@/types/product";

export default function SellerDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/seller/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(data || []);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Products</h1>

      {products.length === 0 && (
        <p className="text-gray-400">No products added yet</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <SellerProductCard
            key={product._id}
            product={product}
            refresh={() => window.location.reload()}
          />
        ))}
      </div>
    </div>
  );
}
