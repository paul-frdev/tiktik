import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { Sidebar } from "components/Sidebar";
import { Navbar } from "components/Navbar";
import { AppProvider } from "providers/AppProvider";
import { Head } from "components/Head";
import { MainLayout } from "components/Layout/MainLayout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <AppProvider>
      <Head title="TikTik" />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  );
};

export default MyApp;
