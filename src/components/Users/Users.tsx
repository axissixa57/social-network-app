import React, { FC } from "react";

import Pagination from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";
import {UsersSearchForm} from './UsersSearchForm'
import { FilterType } from "../../redux/reducers/users";

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const Users: FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  followingInProgress,
  follow, 
  unfollow,
  ...props
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
      <Pagination
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
