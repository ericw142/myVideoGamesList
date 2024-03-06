import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Video Games List",
  description: "Discover, organize and rate your favorite games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
            {children}
            <div className="fixed bottom-0 w-full text-center p-4">
                <Link className="text-blue-700 text-[18px]" href="https://rawg.io/apidocs" target="_blank">Built with RAWG API</Link>
            </div>
        </body>
    </html>
  );
}
