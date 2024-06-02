import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"

import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { AppKnockProviders } from "@/providers/knock-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "E-Shop | E-commerce platform",
  description: "Best E-commerce platform of Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <AppKnockProviders>
            {children}
          </AppKnockProviders>
        </body>
      </html>
    </AuthProvider>
  );
}
