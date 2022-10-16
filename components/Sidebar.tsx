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
import { useMediaQuery } from "react-responsive";
import { Button } from "./Elements/Button";
import { Footer } from "./Footer";

export const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isDesktop = useMediaQuery({
    query: "(max-width: 1279px)",
  });

  const { fetchAllUsers, allUsers } = useAuthStore();
  const router = useRouter();
  const detailOrUpload =
    router.pathname === "/detail/[id]" || router.pathname === "/upload";

  useEffect(() => {
    if (detailOrUpload) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [detailOrUpload]);

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <Button
          className="sidebar__button"
          size="sm"
          variant="inverse"
          onClick={() => setShowSidebar((prev) => !prev)}
          style={
            showSidebar && isDesktop
              ? { margin: "0 auto" }
              : { marginRight: "auto" }
          }
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
