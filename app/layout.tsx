import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Nunito } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pashm",
  description: "Experience Kashmir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${nunito.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
