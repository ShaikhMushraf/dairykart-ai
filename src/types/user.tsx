export interface User {
  id: string;

  // User fields
  firstName?: string;
  lastName?: string;

  // Seller field
  name?: string;

  email: string;
  role: "user" | "seller" | "admin";
}
