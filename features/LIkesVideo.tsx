import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video } from "types";
import { GoVerified } from "react-icons/go";
import { useAuthStore } from "store/authStore";
import { LikeButton } from "components/LikeButton";
import axios from "axios";
import { BASE_URL } from "utils";

interface ILikesVideos {
  post?: Video;
  setPost?: (data: any) => void;
}
export const LIkesVideo = ({ post, setPost }: ILikesVideos) => {
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
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
    <div className="likes-video">
      <div className="likes-video__container">
        <Link href={`/profile/${post?.postedBy._id}`}>
          <Image
            width={60}
            height={60}
            alt="user-profile"
            src={post?.postedBy?.image as any}
            className="likes-video__container-img"
          />
        </Link>
        <div>
          <div className="likes-video__container-user">
            <span>{post?.postedBy.userName.replace(/\s+/g, "")}</span>
            <GoVerified />
          </div>
          <p>{post?.postedBy.userName}</p>
        </div>
      </div>
      <div className="likes-video__caption">
        <p>{post?.caption}</p>
      </div>
      <div className="likes-video__profile">
        {userProfile && (
          <LikeButton handleLike={handleLike} likes={post?.likes} />
        )}
      </div>
    </div>
  );
};
