import React from "react";
import { footerList1, footerList2, footerList3 } from "utils/constants";
import { NextPage } from "next";

interface IListProps {
  items: string[];
  mt: boolean;
}
const List = ({ items, mt }: IListProps) => {
  return (
    <div className={mt ? "footer__list footer__list--mt" : "footer__list"}>
      {items.map((item: string) => (
        <p className="footer__list-item" key={item}>
          {item}
        </p>
      ))}
    </div>
  );
};

export const Footer: NextPage = () => {
  return (
    <div className="footer">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="footer__bottom">{new Date().getFullYear()} TikTik</p>
    </div>
  );
};
