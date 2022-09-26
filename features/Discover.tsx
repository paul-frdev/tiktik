import Link from "next/link";
import React from "react";

import { topics } from "utils/constants";

export const Discover = () => {
  return (
    <div className="discover">
      <h4 className="discover__title">Popular Topics</h4>
      <div className="discover__content">
        {topics.map((item: any) => (
          <Link key={item.id} href={`/?topic=${item.name}`}>
            <div>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
