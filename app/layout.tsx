import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LightRays from "@/components/LightRays";
import "./globals.css";
import Navbar from "@/components/Navbar";

// import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DevEvents",
  description: "The hub For Every Dev Event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="dark"
    >
      <body className = {`${inter.className} antialiased min-h-full flex flex-col `}>
        <Navbar />
      <div className = "absolute inset-0 top-0 z-[-1] min-h-screen">
        <LightRays
          raysOrigin="top-center-offset"
          raysColor="#a05dfe"
          raysSpeed={0.5}
          lightSpread={0.9}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
      />
      </div>
        <main>{children}</main>
        </body>
    </html>
  );
}
