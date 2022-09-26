import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import clsx from "clsx";
import { Discover } from "features/Discover";
import { Button } from "./Elements/Button";

export const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;

  return (
    <div className="sidebar">
      <div className="sidebar__button">
        <Button
          size="sm"
          variant="inverse"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </Button>
      </div>
      {showSidebar && (
        <div className="sidebar__body">
          <div className="sidebar__link">
            <Link href="/">
              <div>
                <p
                  className={`${clsx(
                    "sidebar__icon sidebar__icon--normal-link"
                  )}`}
                >
                  <AiFillHome />
                  <span>For you</span>
                </p>
              </div>
            </Link>
          </div>
          <Discover />
        </div>
      )}
    </div>
  );
};
