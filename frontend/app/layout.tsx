import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "🏃‍♂️ Athlete Registration System | FHE Privacy",
  description: "Privacy-preserving athlete registration using Fully Homomorphic Encryption (FHE). Register securely with end-to-end encryption.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <Providers>
          {/* Animated background */}
          <div className="animated-bg"></div>
          
          {/* Main content */}
          <div className="relative min-h-screen">
            {/* Background gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Page content */}
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
