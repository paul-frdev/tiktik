import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import clsx from "clsx";
import { Discover } from "features/Discover";
import { useRouter } from "next/router";
import { SuggestedAccounts } from "features/SuggestedAccounts";
import { useAuthStore } from "store/authStore";
import { Button } from "./Elements/Button";
import { Footer } from "./Footer";

export const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { fetchAllUsers, allUsers } = useAuthStore();
  const router = useRouter();
  const detail =
    router.pathname === "/detail/[id]" || router.pathname === "/upload";

  useEffect(() => {
    if (detail) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [detail]);

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <Button
          className="sidebar__button"
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
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};
