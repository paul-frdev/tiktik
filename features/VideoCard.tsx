import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { Video } from "types";
import NoAvailableImage from "../assets/no-image.png";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

export const VideoCard: NextPage<IProps> = ({ post, isShowingOnHome }) => {
  const { caption, postedBy, video, likes, _id } = post;

  return (
    <div className="video-card">
      <div>
        <div className="video-card__content">
          <div className="video-card__container">
            <Link href={`/profile/${postedBy._id}`}>
              <Image
                width={62}
                height={62}
                className={
                  post.postedBy.image
                    ? "video-card__image"
                    : "video-card__image--noavalaiable"
                }
                src={post.postedBy.image || NoAvailableImage}
                alt="avatar"
                layout="responsive"
              />
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy._id}`}>
              <div className="video-card__user">
                <p>
                  {postedBy.userName} <GoVerified />
                </p>
                <p>{postedBy.userName}</p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p>{caption}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
