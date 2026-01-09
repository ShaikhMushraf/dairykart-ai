"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { RootState } from "@/redux/store";

/**
 * AdminGuard
 * Protects admin routes
 * Redirects non-admin users
 */
export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Not logged in → redirect
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    // Logged in but not admin → redirect
    if (user?.role !== "admin") {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // While checking auth → render nothing (prevents flicker)
  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
