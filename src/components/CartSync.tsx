"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { saveCart } from "@/utils/cartStorage";

/**
 * CartSync
 * --------
 * Automatically saves cart to localStorage
 * - guest cart → guest_cart
 * - user cart → cart_<userId>
 */
export default function CartSync() {
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    saveCart(items, user?.id);
  }, [items, user]);

  return null;
}
