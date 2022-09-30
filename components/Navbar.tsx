import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogInButtons } from "features/GoogleLogInButtons";
import LogoImg from "../assets/tiktik-logo.png";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link href="/">
          <div>
            <Image
              className="logo__img"
              src={LogoImg}
              alt="Tiktik"
              layout="responsive"
            />
          </div>
        </Link>
      </div>
      <div>Search</div>
      <GoogleLogInButtons />
    </div>
  );
};
