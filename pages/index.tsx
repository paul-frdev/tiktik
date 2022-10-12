import axios from "axios";
import { NoResults } from "components/NoResults";
import { VideoCard } from "features/VideoCard";
import { Video } from "types";
import { BASE_URL } from "utils";

interface IProps {
  videos: Video[];
}
const Videos = ({ videos }: IProps) => {
  return (
    <div className="videos-list">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard key={video._id} post={video} isShowingOnHome />
        ))
      ) : (
        <NoResults text="No videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};

export default Videos;
