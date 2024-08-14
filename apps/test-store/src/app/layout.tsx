import "./globals.css";
import "@repo/ui/styles/styles.css";
import { Toaster } from "@repo/ui/components/toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DVT Store",
  description: "Created by Ian Mungai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
