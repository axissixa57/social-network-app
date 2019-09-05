import React from "react";

import styles from "./Pagination.module.css";

const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    // если число пользователей например 19, а нужна выводить на странице 5 то будет 3 стр, с Math.ceil будет 4, т.к. округляем в большую сторону
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <span
                    className={currentPage === p && styles.selectedPage}
                    onClick={() => {
                        onPageChanged(p);
                    }}
                >{p}</span>;
            })}
        </div>
    )
};

export default Pagination;