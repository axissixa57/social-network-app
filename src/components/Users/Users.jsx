import React from 'react';
import {NavLink} from "react-router-dom";

import styles from "./Users.module.css";
import userLogo from '../../assets/images/user.png';

import Paginator from "../common/Paginator/Paginator";

const Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return (
        <div>
            <Paginator
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
            />
            {
                users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={`/profile/${u.id}`}>
                                    <img
                                        className={styles.userPhoto}
                                        src={u.photos.small != null ? u.photos.small : userLogo}
                                        alt=""
                                    />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed
                                    // если в массиве у userReducer -> state.followingInProgress есть совпавшийся, то вернёт true
                                    ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  props.unfollow(u.id)
                                              }}>Unfollow</button>
                                    : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                              onClick={() => {
                                                  props.follow(u.id)
                                              }}>Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div></div>
                                <div></div>
                            </span>
                        </span>
                    </div>
                })
            }
        </div>
    )
};

export default Users;