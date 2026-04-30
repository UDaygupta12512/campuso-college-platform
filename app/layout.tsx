import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Campuso – Find Your Dream College in India",
  description: "Explore 50+ top Indian colleges, compare fees & placements, predict admission chances by rank",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a0f] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
