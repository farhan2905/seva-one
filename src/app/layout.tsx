import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SEVA1 - Home Services Marketplace",
    template: "%s | SEVA1",
  },
  description: "SEVA1 connects you with verified service professionals for all your home needs. Book AC repair, cleaning, plumbing, electrical services, and more.",
  keywords: ["home services", "AC repair", "cleaning services", "plumbing", "electrical", "appliance repair", "India"],
  authors: [{ name: "SEVA1 Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SEVA1 - Home Services Marketplace",
    description: "Expert home services at your doorstep. Book verified professionals for AC, cleaning, plumbing, electrical, and more.",
    url: "https://seva1.com",
    siteName: "SEVA1",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEVA1 - Home Services Marketplace",
    description: "Expert home services at your doorstep. Book verified professionals for AC, cleaning, plumbing, electrical, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
