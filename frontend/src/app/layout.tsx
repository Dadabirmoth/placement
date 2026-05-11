import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Sérénité - Plateforme de placement de domestiques",
  description:
    "Trouvez une domestique en toute sécurité. La référence ivoirienne pour le recrutement de personnel de maison.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
      <ThemeProvider
  attribute="class"
  defaultTheme="dark"
  enableSystem={false}
  disableTransitionOnChange
>
  <MainLayout>{children}</MainLayout>
</ThemeProvider>
      </body>
    </html>
  );
}