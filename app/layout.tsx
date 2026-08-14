import type { Metadata } from "next";
import localFont from "next/font/local";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const montserrat = localFont({
  src: "../public/fonts/montserrat-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "S-Peak",
  icons: {
    icon: "/brand/favicon.png",
  },
  openGraph: {
    locale: "es_MX",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
