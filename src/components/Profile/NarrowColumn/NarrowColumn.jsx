import React from 'react';

import styles from './NarrowColumn.module.css';
import ProfileInfo from "../ProfileInfo/ProfileInfo";

const NarrowColumn = (props) => {
    return (
        <div className={styles.wrapper}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
};

export default NarrowColumn;
