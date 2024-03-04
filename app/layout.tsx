import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "../lib/apollo-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aniclone",
  description: "Anime/Manga directory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
