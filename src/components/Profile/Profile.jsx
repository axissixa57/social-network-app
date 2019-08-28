import React from 'react';

import styles from './Profile.module.css';
import WideColumn from "./WideColumn/WideColumn";
import NarrowColumn from "./NarrowColumn/NarrowColumn";
import Preloader from "../common/Preloader/Preloader";

const Profile = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={styles.profile_content}>
            <NarrowColumn {...props}/>
            <WideColumn {...props}/>
        </div>
    )
};

export default Profile;

