import React, { useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { IComment, IUser, Video } from "types";
import { useRouter } from "next/router";
import { Head } from "components/Head";
import NoAvailableImage from "../assets/no-image.png";

interface UserProfileCardProps {
  user?: IUser;
  comment?: IComment;
  post?: Video;
  className?: string;
  width?: number;
  height?: number;
}
export const ProfileCard = ({
  user,
  post,
  comment,
  className,
  width = 60,
  height = 60,
}: UserProfileCardProps) => {
  const route = useRouter();

  if (route.pathname === `/profile/[userId]`) {
    return <Head title="Profile" />;
  }
  return (
    <div className={`${clsx("profile-card", className)}`}>
      <div className="profile-card__container">
        <div className="profile-card__container-inner">
          <Link href={`/profile/${user ? user._id : post?.postedBy._id}`}>
            <Image
              width={width}
              height={height}
              className={
                post?.postedBy.image || user?.image
                  ? "profile-card__image"
                  : "profile-card__image--noavalaiable"
              }
              src={user?.image || post?.postedBy.image || NoAvailableImage}
              alt="avatar"
              layout="responsive"
            />
          </Link>
        </div>
        <Link href={`/profile/${user ? user._id : post?.postedBy._id}`}>
          <div className="profile-card__user">
            <p className="profile-card__username">
              {user ? user.userName : post?.postedBy.userName}
              <GoVerified className="profile-card__icon" />
            </p>
            <p className="profile-card__usernamelight">
              {post?.postedBy.userName}
            </p>
          </div>
        </Link>
      </div>
      {post && (
        <Link href={`/detail/${post?._id}`}>
          <p className="profile-card__caption">{post?.caption}</p>
        </Link>
      )}
      {comment && <p className="profile-card__comment">{comment.comment}</p>}
    </div>
  );
};
