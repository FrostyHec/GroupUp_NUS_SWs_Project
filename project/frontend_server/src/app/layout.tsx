import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GroupUp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CookiesProvider>
            {children}
            <Toaster />
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
