import React from 'react';

import object from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={object.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                {/*ProfileStatus*/}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;




