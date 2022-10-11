import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video } from "types";
import { GoVerified } from "react-icons/go";
import { useAuthStore } from "store/authStore";
import { LikeButton } from "features/LikeButton";
import axios from "axios";
import { BASE_URL } from "utils";
import { Comments } from "./Comments";

interface ILikesVideos {
  post?: Video;
  setPost?: (data: any) => void;
}
export const LIkeVideo = ({ post, setPost }: ILikesVideos) => {
  const { userProfile }: any = useAuthStore();

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const response = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post?._id,
        like,
      });
      setPost?.({ ...post, likes: response.data.likes });
    }
  };

  return (
    <div className="like-video">
      <div className="like-video__inner">
        <div className="like-video__container">
          <Link href={`/profile/${post?.postedBy._id}`}>
            <Image
              width={60}
              height={60}
              alt="user-profile"
              src={post?.postedBy?.image as any}
              className="like-video__container-img"
            />
          </Link>
          <div>
            <div className="like-video__container-user">
              <span>{post?.postedBy.userName}</span>
              <GoVerified />
            </div>
            <p>{post?.postedBy.userName}</p>
          </div>
        </div>
        <div className="like-video__caption">
          <p>{post?.caption}</p>
        </div>
        <div className="like-video__profile">
          {userProfile && (
            <LikeButton handleLike={handleLike} likes={post?.likes} />
          )}
        </div>
        <Comments post={post} setPost={setPost} comments={post?.comments} />
      </div>
    </div>
  );
};
