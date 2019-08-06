import React from 'react';

import object from './MyPosts.module.css';
import Post from './Post/Post';

const newPostElement = React.createRef();

const MyPosts = () => {
    return (
        <div className={object.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement} cols="30" rows="10"></textarea>
                </div>
                <div>
                    {/*current ссылается на нативный html element*/}
                    <button onClick={() => alert(newPostElement.current.value)}>Add post</button>
                </div>
            </div>
            <div className={object.posts}>
                <Post/>
            </div>
        </div>
    )
}

export default MyPosts;

