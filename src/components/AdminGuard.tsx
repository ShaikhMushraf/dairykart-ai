"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    if (!isAuthenticated || user?.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
