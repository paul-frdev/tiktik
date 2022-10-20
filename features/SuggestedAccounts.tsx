import React, { useEffect } from "react";
import { IUser } from "types";
import { ProfileCard } from "./ProfileCard";

interface SuggestedAccountsProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}
export const SuggestedAccounts = ({
  fetchAllUsers,
  allUsers,
}: SuggestedAccountsProps) => {
  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);
  return (
    <div className="suggested-accounts">
      <h4 className="suggested-accounts__title">Suggested accounts</h4>
      <div className="suggested-accounts__inner">
        {users.slice(0, 6).map((user: IUser) => (
          <ProfileCard user={user} key={user._id} width={40} height={40} />
        ))}
      </div>
    </div>
  );
};
