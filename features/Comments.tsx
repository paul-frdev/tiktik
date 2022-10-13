import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { NoResults } from "components/NoResults";
import { useAuthStore } from "store/authStore";
import { CommentForm } from "forms/CommentForm";
import axios from "axios";
import { BASE_URL } from "utils";
import { IUser, Video } from "types";
import { LikeButton } from "./LikeButton";

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}
interface CommentsProps {
  post?: Video;
  comments?: IComment[];
  setPost?: (data: any) => void;
}
export const Comments = ({ comments, post, setPost }: CommentsProps) => {
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");
  const { userProfile, allUsers }: any = useAuthStore();

  const addComment = async (event: any) => {
    event.preventDefault();
    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const response = await axios.put(`${BASE_URL}/api/post/${post?._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost?.({ ...post, comments: response.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

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
    <div className="comments">
      <div className="comments__inner">
        {comments?.length ? (
          comments.map((item: IComment) => (
            <div>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className="comments__user-profile" key={user._id}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="comments__user-profile-wrapper">
                          <div>
                            <Image
                              width={48}
                              height={48}
                              className="comments__user-profile-image"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>
                          <p className="comments__user-profile-text">
                            {user.userName}
                            <GoVerified />
                          </p>
                        </div>
                      </Link>
                      <p className="comments__user-profile-comment">
                        {item.comment}
                      </p>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No comments yet! Be the first one to add a comment." />
        )}
        <div className="comments__inner-likes">
          {userProfile && (
            <LikeButton handleLike={handleLike} likes={post?.likes} />
          )}
        </div>
      </div>
      {userProfile && (
        <div className="comments__user">
          <CommentForm
            comment={comment}
            addComment={addComment}
            setComment={setComment}
          />
        </div>
      )}
    </div>
  );
};
