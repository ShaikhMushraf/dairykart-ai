import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import Header from "@/components/Header";

/**
 * Root Layout
 * -----------
 * This wraps the entire app
 * ReduxProvider MUST be here for App Router
 */

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
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
