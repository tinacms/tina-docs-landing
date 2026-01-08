import VideoDialog from "@/components/ui/VideoDialog";
import { VideoDialogProvider } from "@/components/ui/VideoDialogContext";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import React from "react";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

const isDev = process.env.NODE_ENV === "development";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: "Tina",
  description: "Tina Cloud Starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, nunito.variable, lato.variable)}
    >
      <head>
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg`}
          type="image/svg+xml"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {!isDev && gtmId && <GoogleTagManager gtmId={gtmId} />}
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
