import React from 'react';

import object from './ProfileInfo.module.css';
import Preloader from "../../../common/Preloader/Preloader";
import PavelDurov from '../../../../assets/images/pavel-durov.jpg';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    return (
        <div className={object.descriptionBlock}>
            <img width="300" height="326" src={!props.profile.photos.large ? PavelDurov : props.profile.photos.large}
                 alt="Pavel Durov"/>
            {props.isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
        </div>
    );
};

export default ProfileInfo;




