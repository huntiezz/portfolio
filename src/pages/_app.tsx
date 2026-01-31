import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <NextSeo
          title={"Hunter Jackson"}
          description={"Hunter Jackson's Portfolio"}
          canonical={`https://huntiez.com${router.asPath.split("?")[0] === "/" ? "" : router.asPath.split("?")[0]}`}
          themeColor={"#FFFFFF"}
          openGraph={{
            url: `https://huntiez.com${router.asPath.split("?")[0] === "/" ? "" : router.asPath.split("?")[0]}`,
            title: "Hunter Jackson",
            description: "Hunter Jackson's Portfolio",
            images: [
              {
                url: "https://r2.e-z.host/223a47e8-a56e-4a6d-a5a7-09d7420d7ac2/krd90h9v.png",
                alt: "Ocean Banner",
              },
            ],
          }}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
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
