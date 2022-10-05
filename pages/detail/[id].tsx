import axios from "axios";
import { BASE_URL } from "utils";
import { VideoCard } from "features/VideoCard";
import React, { useState } from "react";
import { Video } from "types";
import { Head } from "components/Head";
import { Button } from "components/Elements/Button";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

interface IDetailProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IDetailProps) => {
  const [post, setPost] = useState<any>(postDetails);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <>
      <Head title="Details" />
      <div className="details-video">
        <div className="details-video__inner">
          <Button data-name="details-video" className="details-video__button">
            <MdOutlineCancel />
          </Button>
          <VideoCard post={post} isShowingOnHome />
        </div>
        <div className="details-video__content">sdsdsd</div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data },
  };
};

export default Detail;
