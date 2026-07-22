import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "MEMORIES OS",
  description: "Um arquivo secreto de memórias."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${mono.variable} ${hand.variable} font-body bg-deep text-warmwhite antialiased`}>
        {children}
      </body>
    </html>
  );
}
