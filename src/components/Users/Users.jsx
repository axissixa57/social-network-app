import React from 'react';
import styles from "./Users.module.css";

const Users = (props) => {
    // если число пользователей например 19, а нужна выводить на странице 5 то будет 3 стр, с Math.ceil будет 4, т.к. округляем в большую сторону
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p && styles.selectedPage}
                        onClick={() => {
                            props.onPageChanged(p);
                        }}
                    >{p}</span>;
                })}
            </div>
            {
                props.users.map(u => {
                    return <div key={u.id}>
                        <span>
                            <div>
                                <img className={styles.userPhoto} src={u.photoUrl} alt=""/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
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
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                            </span>
                        </span>
                    </div>
                })
            }
        </div>
    )
}

export default Users;