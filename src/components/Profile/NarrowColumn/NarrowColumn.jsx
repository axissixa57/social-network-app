import React from 'react';

import styles from './NarrowColumn.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const NarrowColumn = (props) => {
    return (
        <div className={styles.wrapper}>
            <ProfileInfo {...props}/>
        </div>
    )
};

export default NarrowColumn;
