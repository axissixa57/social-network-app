import React from 'react';
import object from './Post.module.css';

const Post = (props) => {
    return (
        <div className={object.item}>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;

