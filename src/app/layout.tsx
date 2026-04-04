import type { Metadata } from "next";
import { Geist, Geist_Mono, Azeret_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import { RelayProvider } from "@/relay/RelayProvider";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flamingo Issue Tracker",
  description: "Minimal issue tracker built with Next.js, Relay, and Supabase",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦩</text></svg>",
  },
};

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${azeretMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-w-[375px]`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark')})()`,
          }}
        />
        <RelayProvider>
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
        </RelayProvider>
      </body>
    </html>
  );
}
