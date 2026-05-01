import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  DM_Sans,
  DM_Serif_Display,
  Space_Grotesk,
  Merriweather,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const playfair = Playfair_Display({
  variable: "--font-playfair", subsets: ["latin"], display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans", subsets: ["latin"], display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif", subsets: ["latin"], display: "swap", weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk", subsets: ["latin"], display: "swap",
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather", subsets: ["latin"], display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Applied — SDE to Applied Scientist",
  description: "A 12-month gamified curriculum for transitioning from SDE to Applied Scientist in Generative AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="midnight"
      className={[
        inter.variable,
        playfair.variable,
        dmSans.variable,
        dmSerif.variable,
        spaceGrotesk.variable,
        merriweather.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
