import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Rendeere | Engineering, Gaming, XR, and AI Solutions",
  description: "Cutting-edge technology solutions spanning engineering, videogames, XR experiences, and artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
      </head>
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground`}>
        <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}