import React from 'react';

import object from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div>
                img
            </div>
            <div className={object.descriptionBlock}>
                <img src={props.profile.photos.large} alt=""/>
                ava + disc
            </div>
        </div>
    );
}

export default ProfileInfo;




