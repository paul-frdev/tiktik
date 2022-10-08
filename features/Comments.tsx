import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { NoResults } from "components/NoResults";
import { useAuthStore } from "store/authStore";
import { CommentForm } from "forms/CommentForm";
import axios from "axios";
import { BASE_URL } from "utils";
import { Video } from "types";

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
  const { userProfile }: any = useAuthStore();

  const addComment = async (event: any) => {
    event.prevantDefault();
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

  return (
    <div className="comments">
      <div className="comments__inner">
        {comments?.length ? (
          <div>sdsddsdddsds</div>
        ) : (
          <NoResults text="No comments yet! Be the first one to add a comment." />
        )}
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
