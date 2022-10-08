import React from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface NoResultsProps {
  text: string;
}

export const NoResults = ({ text }: NoResultsProps) => {
  return (
    <div className="no-results">
      <p className="no-results__icon">
        {text.length > 0 ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="no-results__text">{text}</p>
    </div>
  );
};
