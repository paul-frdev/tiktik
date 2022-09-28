import Link from "next/link";
import React from "react";
import clsx from "clsx";

import { topics } from "utils/constants";
import { useRouter } from "next/router";

export const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className="discover">
      <h4 className="discover__title">Popular Topics</h4>
      <div className="discover__content">
        {topics.map((item: any) => (
          <Link key={item.id} href={`/?topic=${item.name}`}>
            <div className={topic === item.name ? "active-item" : "item"}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
