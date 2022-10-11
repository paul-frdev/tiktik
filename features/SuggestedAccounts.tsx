import { Head } from "components/Head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { IUser } from "types";
import { GoVerified } from "react-icons/go";

interface SuggestedAccountsProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}
export const SuggestedAccounts = ({
  fetchAllUsers,
  allUsers,
}: SuggestedAccountsProps) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  return (
    <div className="suggested-accounts">
      <h4 className="suggested-accounts__title">Suggested accounts</h4>
      <div className="suggested-accounts__inner">
        {users.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="suggested-accounts__user-profile">
              <div>
                <Image
                  width={34}
                  height={34}
                  className="suggested-accounts__user-profile-img"
                  src={user.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>
              <div className="suggested-accounts__user-profile-name">
                <p>
                  {user.userName}
                  <span>
                    <GoVerified />
                  </span>
                </p>
                <p>{user.userName}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
