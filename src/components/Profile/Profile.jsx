import React from 'react';
import object from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return (
        <div className={object.content}>
            <div>
                img
            </div>
            <div>
                ava + disc
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile;

