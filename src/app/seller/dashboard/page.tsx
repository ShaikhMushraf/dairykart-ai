"use client";

import { useEffect, useState } from "react";
import AddProductModal from "@/components/AddProductModal";
import SellerProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

/**
 * SellerDashboardPage
 * -------------------
 * - Fetch seller-specific products
 * - Display products in card layout
 * - Add new product via modal
 */
export default function SellerDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Fetch products created by logged-in seller
   * - Uses JWT token from localStorage
   */
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/seller/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setProducts(data);
  };

  /**
   * Load seller products on page load
   */
  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();
  }, []);

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 px-4 py-2 rounded"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <SellerProductCard
            key={product._id}
            product={product}
            refresh={fetchProducts}
          />
        ))}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}
