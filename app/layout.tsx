import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CookiesProvider } from 'next-client-cookies/server';

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
        <CookiesProvider>
            <body className={inter.className}>
                <div className="flex items-center justify-end p-4 z-[100] w-full sticky bg-white">
                    <Link href="/" className='text-xl'>My Video Games List -</Link>
                    <Link className="text-blue-700 text-[12px] mr-auto ml-2" href="https://rawg.io/apidocs" target="_blank">Built with RAWG API</Link>
                    <Link href="/discover" className="p-2">Discover</Link>
                    <Link href="/topgames" className="p-2">Top Games</Link>
                    <Link href="/comingsoon" className="p-2">Coming Soon</Link>
                    <Link href="/" className="p-2">My List</Link>
                </div>
                {children}
            </body>
        </CookiesProvider>
    </html>
  );
}
