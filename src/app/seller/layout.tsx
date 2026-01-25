import SellerSidebar from "@/components/SellerSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <SellerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
