import { Button } from "components/Elements/Button";
import React from "react";

interface CommentFormProps {
  comment?: string;
  setComment?: (event: string) => void;
  addComment?: (event: any) => void;
}
export const CommentForm = ({
  comment,
  setComment,
  addComment,
}: CommentFormProps) => {
  const isPostingComment = true;
  return (
    <form className="comment-form" onSubmit={addComment}>
      <input
        className="comment-form__input"
        value={comment}
        onChange={(event: any) => setComment?.(event.target.value)}
        placeholder="Add comment"
      />
      <Button onClick={addComment}>
        {!isPostingComment ? "Commenting" : "Comment"}
      </Button>
    </form>
  );
};
