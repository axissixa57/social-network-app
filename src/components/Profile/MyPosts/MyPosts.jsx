import React from 'react';
import object from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                New post
            </div>
            <div className={object.posts}>
                <Post/>
            </div>
        </div>
    )
}

export default MyPosts;

