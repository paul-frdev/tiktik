import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "utils";
import { VideoCard } from "features/VideoCard";
import { Video } from "types";
import { Head } from "components/Head";
import { Button } from "components/Elements/Button";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/router";
import { LIkesVideo } from "features/LIkesVideo";

interface IDetailProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IDetailProps) => {
  const [post, setPost] = useState<Video>(postDetails);
  const router = useRouter();

  console.log("post", post);

  return (
    <>
      <Head title="Details" />
      <div className="details-video">
        <div className="details-video__inner">
          <Button
            onClick={() => router.back()}
            data-name="details-video"
            className="details-video__button"
          >
            <MdOutlineCancel />
          </Button>
          <VideoCard post={post} isShowingOnHome />
        </div>
        <div className="details-video__content">
          <LIkesVideo post={post} setPost={setPost} />
        </div>
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
