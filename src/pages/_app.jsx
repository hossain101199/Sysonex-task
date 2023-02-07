import Header from "@/layout/Header";
import "@/styles/globals.scss";
import { getStoredData } from "@/utils/localStorage";
import { AppContext } from "AppContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (getStoredData("JWT") !== null) {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Head>
          <title>{`Sysonex - ${router?.pathname}`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Component {...pageProps} />
          <Toaster />
        </AppContext.Provider>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{`Sysonex - ${router?.pathname}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Header />
        <main>
          <Component {...pageProps} />
          <Toaster />
        </main>
      </AppContext.Provider>
    </>
  );
}
