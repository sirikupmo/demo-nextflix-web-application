import type { Metadata } from "next";
import { JetBrains_Mono, Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '700'],
});

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-thai",
});

const fontVars = [
  jetBrainsMono.variable,
  kanit.variable,
].join(" ");

export const metadata: Metadata = {
  title: 'Nextflix Web Application',
  description: 'Demo Next.js and NestJS application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVars} bg-netflix-light dark:bg-netflix-dark text-netflix-light-text dark:text-netflix-dark-text min-h-screen flex flex-col`} >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen">
            <div className="absolute top-2 left-2 z-50 p-2 sm:p-2">
              <ThemeToggle />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
