import React from 'react';
import styles from './Users.module.css';
import * as axios from "axios";

// const Users = (props) => {
//     return (
//         <div>
//             {
//                 props.users.map(u => {
//                     return <div key={u.id}>
//                         <span>
//                             <div>
//                                 <img className={styles.userPhoto} src={u.photoUrl} alt=""/>
//                             </div>
//                             <div>
//                                 {u.followed
//                                     ? <button onClick={() => {
//                                         props.unfollow(u.id)
//                                     }}>Unfollow</button>
//                                     : <button onClick={() => {
//                                         props.follow(u.id)
//                                     }}>Follow</button>
//                                 }
//                             </div>
//                         </span>
//                         <span>
//                             <span>
//                                 <div>{u.fullName}</div>
//                                 <div>{u.status}</div>
//                             </span>
//                             <span>
//                                 <div>{u.location.country}</div>
//                                 <div>{u.location.city}</div>
//                             </span>
//                         </span>
//                     </div>
//                 })
//             }
//         </div>
//     )
// }

class Users extends React.Component {
    // конструктор необязателен, props и так придут по умолчанию
    // constructor(props) {
    //     super(props);
    // }

    // вызывается, когда jsx разметка отрисуется
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                this.props.setUsers(res.data.items);
                this.props.setTotalUsersCount(res.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        // если число пользователей например 19, а нужна выводить на странице 5 то будет 3 стр, с Math.ceil будет 4, т.к. округляем в большую сторону
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div>
                    {pages.map(p => {
                        return <span
                            className={this.props.currentPage === p && styles.selectedPage}
                            onClick={() => {
                                this.onPageChanged(p);
                            }}
                        >{p}</span>;
                    })}
                </div>
                {
                    this.props.users.map(u => {
                        return <div key={u.id}>
                        <span>
                            <div>
                                <img className={styles.userPhoto} src={u.photoUrl} alt=""/>
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => {
                                        this.props.unfollow(u.id)
                                    }}>Unfollow</button>
                                    : <button onClick={() => {
                                        this.props.follow(u.id)
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
}

export default Users;