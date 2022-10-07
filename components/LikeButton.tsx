import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useAuthStore } from "store/authStore";
import { Video } from "types";
import { Button } from "./Elements/Button";

interface LikeButtonProps {
  likes?: any[];
  post?: Video;
  flex?: string;
  handleLike?: (like: boolean) => void;
  handleDisLike?: () => void;
}
export const LikeButton = ({
  likes,
  post,
  flex,
  handleLike,
  handleDisLike,
}: LikeButtonProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile._id
  );

  useEffect(() => {
    if (filterLikes) {
      if (filterLikes?.length > 0) {
        setAlreadyLiked(true);
      } else {
        setAlreadyLiked(false);
      }
    }
  }, [filterLikes, likes]);

  return (
    <div className="like-button">
      {alreadyLiked ? (
        <Button
          className="like-button__dislike"
          onClick={() => handleLike?.(false)}
        >
          <MdFavorite className="like-button__dislike-img" />
        </Button>
      ) : (
        <Button
          className="like-button__like"
          onClick={() => handleLike?.(true)}
        >
          <MdFavorite className="like-button__like-img" />
        </Button>
      )}
      <p className="like-button__length">{likes?.length || 0}</p>
    </div>
  );
};
