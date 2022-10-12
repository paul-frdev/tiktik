import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogInButtons } from "features/GoogleLogInButtons";
import { SearchForm } from "forms/SearchForm";
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
              alt="TikTik"
              layout="responsive"
            />
          </div>
        </Link>
      </div>
      <SearchForm />
      <GoogleLogInButtons />
    </div>
  );
};
