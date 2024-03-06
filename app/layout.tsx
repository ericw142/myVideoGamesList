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
            <div className="flex items-center justify-end p-4 z-[100] w-full absolute bg-white">
                <Link href="/" className='mr-auto text-xl'>My Video Games List</Link>
                <Link href="/discover" className="p-2">Discover</Link>
                <Link href="/topgames" className="p-2">Top Games</Link>
                <Link href="/login" className="p-2">Login</Link>
                <Link href="/signup" className="p-2">Signup</Link>
            </div>
            {children}
            <div className="fixed bottom-0 w-full text-center p-4">
                <Link className="text-blue-700 text-[18px]" href="https://rawg.io/apidocs" target="_blank">Built with RAWG API</Link>
            </div>
        </body>
    </html>
  );
}
