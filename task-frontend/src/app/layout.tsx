import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/queryProvider/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="container">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
