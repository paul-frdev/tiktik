import { Head } from "components/Head";
import React from "react";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export const ContentLayout = ({ title, children }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="content-layout">
        <div className="content-layout__body">{children}</div>
      </div>
    </>
  );
};
