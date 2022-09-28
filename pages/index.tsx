import axios from "axios";
import { VideoCard } from "features/VideoCard";
import { Video } from "types";

interface IProps {
  videos: Video[];
}
const Videos = ({ videos }: IProps) => {
  return (
    <div className="videos-list">
      {videos.length
        ? videos.map((video: Video) => (
            <VideoCard key={video._id} post={video} isShowingOnHome />
          ))
        : null}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Videos;
