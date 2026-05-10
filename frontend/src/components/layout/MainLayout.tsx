"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("./CookieBanner").then((mod) => mod.CookieBanner),
  { ssr: false }
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}