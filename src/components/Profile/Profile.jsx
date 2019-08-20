import React from 'react';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styles from './Profile.module.css';
import WideColumn from "./WideColumn/WideColumn";
import NarrowColumn from "./NarrowColumn/NarrowColumn";

const Profile = (props) => {
    return (
        <div className={styles.profile_content}>
            <NarrowColumn {...props}/>
            {/*<ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>*/}
            <WideColumn {...props}/>
        </div>
    )
};

export default Profile;

