import React, {useState} from 'react';
import classNames from "classnames";

import styles from './Paginator.module.css'

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    // если число пользователей например 19, а нужна выводить на странице 5 то будет 3 стр, с Math.ceil будет 4, т.к. округляем в большую сторону
    const pagesCount = Math.ceil(totalItemsCount / pageSize); // число пользователей / на кол-во отображаемых на странице = кол-во всего страниц в пагинации

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize); // кол-во всего страниц в пагинаци / portionSize - общее кол-во 1-10 - 1, 11-20 - 2,...131-137 - 17 = portionCount - 17
    const [portionNumber, setPortionNumber] = useState(1); // страницы 1-10 - это portionNumber = 1, старницы 131-137 - portionNumber = 17
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // задание крайнего левого числа в portionSize, также для условия определения кнопки prev
    const rightPortionPageNumber = portionNumber * portionSize; // задание крайнего правого числа в portionSize, также для условия определения кнопки next

    return <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button
            onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}
        >
            PREV
        </button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span
                    className={classNames(styles.pageNumber, {
                        [styles.selectedPage]: currentPage === p
                    })}
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</span>
            })}

        {portionCount > portionNumber &&
        <button
            onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}
        >
            NEXT
        </button>}
    </div>
};

export default Paginator;