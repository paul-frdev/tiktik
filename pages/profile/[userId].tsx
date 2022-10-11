import { useEffect, useState } from "react";
import { IUser, Video } from "types";
import { BASE_URL } from "utils";
import { GoVerified } from "react-icons/go";
import { VideoCard } from "features/VideoCard";

import axios from "axios";
import Image from "next/image";
import clsx from "clsx";
import NoFoundImage from "assets/no-image.png";
import { NoResults } from "components/NoResults";

interface ProfileProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: ProfileProps) => {
  const [showVideos, setShowVideos] = useState(false);
  const [videoList, setVideoList] = useState<Video[]>([]);

  const { userVideos, userLikedVideos, user } = data;

  useEffect(() => {
    if (showVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showVideos, userLikedVideos, userVideos]);

  return (
    <div className="profile-user">
      <div className="profile-user__inner">
        <div className="profile-user__container">
          <Image
            width={60}
            height={60}
            src={user?.image || NoFoundImage}
            className="profile-user__container-img"
            layout="responsive"
            alt="user-profile"
          />
        </div>
        <div>
          <div className="profile-user__container-name">
            {user?.userName}
            <GoVerified className="profile-user__container-icon" />
          </div>
          <p className="profile-user__container-secondname">{user.userName}</p>
        </div>
      </div>
      <div className="profile-user__wrapper">
        <button
          type="button"
          className={`${clsx("profile-user__wrapper-videos", {
            videos: showVideos,
          })}`}
          onClick={() => setShowVideos(true)}
        >
          Videos
        </button>
        <button
          type="button"
          className={`${clsx("profile-user__wrapper-liked", {
            liked: !showVideos,
          })}`}
          onClick={() => setShowVideos(false)}
        >
          Liked
        </button>
      </div>
      <div className="profile-user__videos">
        {videoList.length > 0 ? (
          videoList.map((post: Video) => (
            <VideoCard post={post} key={post._id} />
          ))
        ) : (
          <NoResults text={`No ${showVideos ? "" : "liked"} videos yet`} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};
export default Profile;
