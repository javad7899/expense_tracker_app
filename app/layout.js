import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header"

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: " Expense Tracker App",
  description: "Build & Deploy Full Stack Next.js Expense Tracker App Using React, Tailwind Css, Drizzle ORM, Clerk",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
      <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
