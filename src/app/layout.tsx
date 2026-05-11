import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yousef Hanafy | Front-End Engineer",
  description: "Portfolio of Yousef Hanafy — Front-End Engineer specializing in React, Next.js, and modern web technologies.",
  keywords: ["Front-End Engineer", "Software Developer", "React", "Next.js", "Tailwind CSS", "Yousef Hanafy"],
  authors: [{ name: "Yousef Hanafy" }],
  icons: {
    icon: "/H_Logo.avif",
    shortcut: "/H_Logo.avif",
    apple: "/H_Logo.avif",
  },
  openGraph: {
    title: "Yousef Hanafy | Front-End Engineer",
    description: "Portfolio showcasing advanced front-end engineering projects and systems design.",
    type: "website",
    images: [
      {
        url: "/H_Logo.avif",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
