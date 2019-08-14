import React from 'react';

import object from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={object.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;




