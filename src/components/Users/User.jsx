import React from 'react';
import {NavLink} from "react-router-dom";

import styles from "./Users.module.css";
import userLogo from '../../assets/images/user.png';

const User = ({user, followingInProgress, follow, unfollow}) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img
                            className={styles.userPhoto}
                            src={user.photos.small != null ? user.photos.small : userLogo}
                            alt=""
                        />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        // если в массиве у userReducer -> state.followingInProgress есть совпавшийся, то вернёт true
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>
    )
};

export default User;