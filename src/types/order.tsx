/**
 * Single product inside an order
 */
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

/**
 * Order structure
 */
export interface Order {
  _id?: string;
  userId?: string;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  status: "pending" | "paid" | "shipped" | "delivered";
  createdAt?: string;
}
