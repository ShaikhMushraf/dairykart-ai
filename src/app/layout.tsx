"use client";

import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Header from "@/components/Header";
import LoginModalWrapper from "@/components/LoginModalWrapper";
import CartSync from "@/components/CartSync";
import SellerModalWrapper from "@/components/SellerModalWrapper";
import UserSidebar from "@/components/UserSidebar";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  // USER UI → show sidebar
  if (user?.role === "user") {
    return (
      <div className="flex bg-black text-white">
        <UserSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }

  // PUBLIC UI → NO sidebar
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <ReduxProvider>
          <Header />
          <CartSync />
          <LoginModalWrapper />
          <SellerModalWrapper />

          <AppShell>{children}</AppShell>
        </ReduxProvider>
      </body>
    </html>
  );
}
