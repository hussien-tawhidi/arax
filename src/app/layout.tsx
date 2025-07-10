import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/header/Header";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "فروشگاه اینترنتی اراکس | خرید آنلاین با بهترین قیمت و کیفیت",
  description:
    "HT یک فروشگاه اینترنتی مدرن با بهترین قیمت‌ها و کیفیت برتر است. از تکنولوژی Next.js برای ارائه تجربه‌ای سریع، امن و کاربرپسند استفاده شده است.",
  keywords: [
    "فروشگاه اینترنتی",
    "HT",
    "خرید آنلاین",
    "Next.js",
    "فروشگاه مدرن",
  ],
  authors: [{ name: "HT Dev Team", url: "https://ht-online.vercel.app/" }],
  creator: "HT",
  metadataBase: new URL("https://ht-online.vercel.app/"),
  openGraph: {
    title: "فروشگاه اینترنتی HT | خرید سریع و مطمئن",
    description:
      "با فروشگاه اینترنتی HT، از تجربه خرید آنلاین لذت ببرید. تنوع بالا، قیمت مناسب، و طراحی سریع با Next.js.",
    url: "https://ht-online.vercel.app/",
    siteName: "HT Online Store",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    title: "فروشگاه HT | تجربه‌ای نو در خرید آنلاین",
    description: "محصولات با کیفیت و تحویل سریع در HT. طراحی شده با Next.js.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <head>
        <link rel='icon' href='/logo.ico' sizes='any' />
      </head>
      <body className='antialiased bg-light text-darker'>
        <main className='min-h-screen bg-light text-dark'>
          <Header />
          <div className='md:pb-0 pb-20'>
            {children}

            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
