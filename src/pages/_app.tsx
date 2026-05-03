import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split("?")[0] === "/" ? "" : router.asPath.split("?")[0];

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div
        className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
      >
        <Head>
          <title>huntiezzyyy</title>
          <meta name="description" content="Developer portfolio - huntiez.com" />
          <link rel="canonical" href={`https://huntiez.com${path}`} />
          <meta name="theme-color" content="#131318" />
          <meta property="og:url" content={`https://huntiez.com${path}`} />
          <meta property="og:title" content="huntiez folio" />
          <meta property="og:description" content="Developer portfolio - huntiez.com" />
        </Head>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
