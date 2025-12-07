import type { Metadata } from "next";
import { Degular } from '@/app/fonts/index';
import "./globals.css";

export const metadata: Metadata = {
  title: "Stack Dashboard",
  description: "Track your Transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${Degular.className}`}>
        {children}
      </body>
    </html>
  );
}
