/**
 * Product Type
 * Matches backend Product schema
 */
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  category?: {
    _id: string;
    name: string;
  };
}
