/**
 * Product Type
 * Matches backend Product schema
 */
/**
 * Product Type
 * ------------
 * Used across UI, Redux, Seller Dashboard
 * Image is REQUIRED for UI rendering
 */
export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string; // ✅ REQUIRED
  stock: number;
  isActive: boolean;
  sellerId?: string;
  category?: {
    _id: string;
    name: string;
  };
}

/**
 * Payload used when creating product
 * (image optional while creating)
 */
export interface CreateProductPayload {
  name: string;
  price: number;
  image?: string;
  stock: number;
}