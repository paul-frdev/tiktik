import { Navbar } from "components/Navbar";
import { Sidebar } from "components/Sidebar";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="main-layout">
      <Navbar />
      <div className="main-layout__container">
        <Sidebar />
        <div className="main-layout__content videos">{children}</div>
      </div>
    </main>
  );
};
