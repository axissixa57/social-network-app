import React from 'react';

import object from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import PavelDurov from '../../../assets/images/pavel-durov.jpg';

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }

    return (
        <div className='narrow_column_wrap'>
            <div className={object.descriptionBlock}>
                <img width="300" height="326" src={!props.profile.photos.large ? PavelDurov : props.profile.photos.large} alt="Pavel Durov"/>
                {/*ProfileStatus*/}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;




