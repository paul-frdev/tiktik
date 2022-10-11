import { Button } from "components/Elements/Button";
import React, { Dispatch, SetStateAction } from "react";

interface CommentFormProps {
  comment?: string;
  setComment?: Dispatch<SetStateAction<string>>;
  addComment?: (event: React.FormEvent) => void;
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
      <Button
        disabled={!comment?.length}
        className="comment-form__button"
        onClick={addComment}
      >
        {!isPostingComment ? "Commenting" : "Comment"}
      </Button>
    </form>
  );
};
