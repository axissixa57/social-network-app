import React from 'react';

import Pagination from "../common/Pagination/Pagination";
import User from "./User";

const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged}/>
            <div>
                {
                    users.map(u => (
                        <User
                            user={u}
                            followingInProgress={followingInProgress}
                            follow={follow}
                            unfollow={unfollow}
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default Users;