import React, { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "utils";
import { useAuthStore } from "store/authStore";
import Link from "next/link";
import { Button } from "components/Elements/Button";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import NoAvailableImage from "../assets/no-image.png";

export const GoogleLogInButtons = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="google-login">
      {user ? (
        <div className="google-login__profile">
          <Link href="/upload">
            <Button className="button-upload">
              <IoMdAdd className="button-upload__icon" />
              <span className="button-upload__text">Upload</span>
            </Button>
          </Link>
          {user.image && (
            <Link href={`/profile/${user._id}`}>
              <Image
                width={38}
                height={38}
                className="user-profile__img"
                src={user.image || NoAvailableImage}
                alt="user"
              />
            </Link>
          )}
          <Button
            className="button-logout"
            onClick={() => {
              googleLogout();
              removeUser();
            }}
          >
            <AiOutlineLogout />
          </Button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(response: any) => createOrGetUser(response, addUser)}
          onError={() => console.log("Error")}
        />
      )}
    </div>
  );
};
