import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CookiesProvider } from "next-client-cookies/server";
import { SurveyContextProvider } from "@/components/context/SurveyContext";
import { Toaster } from "@/components/ui/sonner";
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
            <SurveyContextProvider>
              {children}
              <Toaster />
            </SurveyContextProvider>
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
