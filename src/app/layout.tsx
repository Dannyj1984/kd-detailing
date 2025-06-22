import type { Metadata } from "next";
import { Inter, Caveat} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "KD Detailing | Car Detailing",
  description: "Portfolio of KD Detailing, a professional graphic design company specialising in brand identity and digital design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} font-sans`}>{children}</body>
    </html>
  );
}
