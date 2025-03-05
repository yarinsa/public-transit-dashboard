
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import auth from '@/lib/auth'
import { NuqsAdapter } from "nuqs/adapters/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Transit Metrics",
    template: "%s | Transit Metrics",
  },
  description: "Transit Metrics",

};

export default async function RootLayout({
  children,
  login,
  dashboard,
}: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
  dashboard: React.ReactNode;
}>) {
  const isLoggedIn = await auth.isLoggedIn();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <NuqsAdapter>
        {isLoggedIn ? dashboard : login}
        {children}
          </NuqsAdapter>
        </Provider>
      </body>
    </html>
  );
}
