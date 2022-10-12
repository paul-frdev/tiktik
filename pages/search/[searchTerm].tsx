import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { NoResults } from "components/NoResults";
import { VideoCard } from "features/VideoCard";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoVerified } from "react-icons/go";
import { useAuthStore } from "store/authStore";
import { IUser, Video } from "types";
import { BASE_URL } from "utils";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;
  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm)
  );
  return (
    <div className="search">
      <div className="search__buttons">
        <button
          className={`search__buttons-accounts ${isAccounts && "accounts"}`}
          type="button"
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </button>
        <button
          className={`search__buttons-videos ${!isAccounts && "videos"}`}
          type="button"
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </button>
      </div>
      {isAccounts ? (
        <div className="search__profile">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className="search__profile-user">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      src={user.image}
                      className="search__profile-image"
                    />
                  </div>
                  <div>
                    <p className="search__profile-text">
                      {user.userName}
                      <span>
                        <GoVerified className="search__profile-icon" />
                      </span>
                    </p>
                    <p className="search__profile-username">{user.userName}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div>
          {videos.length > 0 ? (
            videos.map((post: Video) => (
              <VideoCard key={post._id} post={post} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  let searchTermPath = decodeURI(searchTerm);
  searchTermPath = encodeURI(searchTermPath);
  const res = await axios.get(`${BASE_URL}/api/search/${searchTermPath}`);

  return {
    props: { videos: res.data },
  };
};
export default Search;
