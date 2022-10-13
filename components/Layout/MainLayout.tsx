import { Navbar } from "components/Navbar";
import { Sidebar } from "components/Sidebar";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="main-layout">
        <div className="main-layout__container">
          <Sidebar />
          <div className="main-layout__content videos">{children}</div>
        </div>
      </main>
    </>
  );
};
