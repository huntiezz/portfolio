import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import CustomCursor from "@/components/CustomCursor";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Head>
        <title>Hunter Jackson</title>
        <meta name="description" content="Portfolio" />
        <link rel="canonical" href={`https://huntiez.com${router.asPath.split("?")[0] === "/" ? "" : router.asPath.split("?")[0]}`} />
        <meta name="theme-color" content="#FFFFFF" />
        <meta property="og:url" content={`https://huntiez.com${router.asPath.split("?")[0] === "/" ? "" : router.asPath.split("?")[0]}`} />
        <meta property="og:title" content="Hunter Jackson" />
        <meta property="og:description" content="Portfolio" />
      </Head>
      <Component {...pageProps} />
      <CustomCursor />
    </ThemeProvider>
  );
}

if (typeof window !== 'undefined') {
  (window as any).toggleBirthday = () => {
    localStorage.setItem('debug_birthday', 'true');
    console.log('Birthday mode enabled! Reloading...');
    window.location.reload();
  };
  (window as any).resetBirthday = () => {
    localStorage.removeItem('debug_birthday');
    console.log('Birthday mode disabled. Reloading...');
    window.location.reload();
  };
}
