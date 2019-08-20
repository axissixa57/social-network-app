import React from 'react';

import styles from './WideColumn.module.css';
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import ProfileStatusWithHooks from "../ProfileInfo/ProfileStatusWithHooks";

const WideColumn = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.infoBlock} page-block`}>
                <h2 className={styles.pageName}>{props.profile ? props.profile.fullName : 'Pavel Durov'}</h2>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <MyPostsContainer/>

        </div>
    )
}

export default WideColumn;
