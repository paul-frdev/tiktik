import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { Sidebar } from "components/Sidebar";
import { Navbar } from "components/Navbar";
import { AppProvider } from "providers/AppProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <AppProvider>
      <main className="my-app">
        <Navbar />
        <div className="my-app__container">
          <Sidebar />
          <div className="my-app__content videos">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </AppProvider>
  );
};

export default MyApp;
