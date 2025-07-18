import type { Metadata } from "next";
import { JetBrains_Mono, Kanit } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${fontVars} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
