import React from 'react';

import styles from './Profile.module.css';
import WideColumn from "./WideColumn/WideColumn";
import NarrowColumn from "./NarrowColumn/NarrowColumn";

const Profile = (props) => {
    return (
        <div className={styles.profile_content}>
            <NarrowColumn {...props}/>
            <WideColumn {...props}/>
        </div>
    )
};

export default Profile;

