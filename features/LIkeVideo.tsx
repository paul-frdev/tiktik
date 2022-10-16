import React from "react";
import { Video } from "types";
import { Comments } from "./Comments";
import { ProfileCard } from "./ProfileCard";

interface ILikesVideos {
  post?: Video;
  setPost?: (data: any) => void;
}
export const LIkeVideo = ({ post, setPost }: ILikesVideos) => {
  return (
    <div className="like-video">
      <div className="like-video__inner">
        <ProfileCard post={post} />
        <Comments post={post} setPost={setPost} comments={post?.comments} />
      </div>
    </div>
  );
};
