import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "devicon/devicon.min.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hrishikesh Mahamuni | MERN Stack & React JS Developer ",
  description: "Hrishikesh Mahamuni is a Frontend, Backend & MERN Stack Developer based in Pune, skilled in React JS, Next JS, Node JS, Express JS, and MongoDB. Available for freelance web development projects and full-time opportunities.",
  keywords: [
    "Hrishikesh Mahamuni",
    "Hrishikesh Mahamuni Portfolio",
    "MERN Stack Developer",
    "MERN Stack Developer Pune",
    "React JS Developer",
    "React JS Developer Pune",
    "Node JS Developer",
    "Frontend Developer Pune",
    "Backend Developer Pune",
    "Web Developer Pune",
    "Freelance Web Developer Pune",
    "Freelance Developer in Pune",
    "Next JS Developer",
    "Express JS Developer",
    "MongoDB Developer",
    "JavaScript Developer Pune",
    "Full Stack Developer Pune",
  ],
  authors: [{ name: "Hrishikesh Mahamuni" }],
  creator: "Hrishikesh Mahamuni",
  openGraph: {
    title: "Hrishikesh Mahamuni | MERN Stack & React JS Developer in Pune",
    description:
      "Frontend, Backend & MERN Stack Developer in Pune specializing in React JS, Next JS, Node JS, Express JS, and MongoDB. Open to freelance and full-time roles.",
    type: "website",
    locale: "en_IN",
  },
  icons:
    {
      icon: '/MyLogo.svg'
    },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
