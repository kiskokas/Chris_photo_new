import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider"; // Import ThemeProvider
import DarkModeToggle from "@/app/components/DarkModeToggle";
import { PackageProvider } from "@/app/components/PackageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krisztian PhotoArt",
  description: "Created by Nagy Krisztian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PackageProvider> {/* Wrap with PackageProvider */}
            {children}
            <DarkModeToggle />
          </PackageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}