import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Intelligent Resume Builder | ATS-Optimized Resume Maker",
  description: "Create professional, ATS-friendly resumes with AI-powered content suggestions. Tailored for modern job markets with real-time optimization.",
  keywords: ["resume builder", "ATS-friendly", "job application", "CV maker", "professional resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
