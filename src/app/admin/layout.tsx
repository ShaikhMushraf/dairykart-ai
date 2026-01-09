import AdminGuard from "@/components/AdminGuard";

/**
 * Admin Layout
 * This layout wraps ALL /admin routes
 * Only admins can access pages inside this folder
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
