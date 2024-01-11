import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Andromeda Toolkit",
  description: "A powerful and feature-rich toolkit site.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-[#EEF2F6]`}>
        <Navbar />
        <div className="flex justify-center">
          <div className="w-11/12 h-screen">{children}</div>
        </div>
      </body>
    </html>
  );
}
