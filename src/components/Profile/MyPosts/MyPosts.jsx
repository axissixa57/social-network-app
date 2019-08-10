import React from 'react';

import object from './MyPosts.module.css';
import Post from './Post/Post';

const newPostElement = React.createRef();

const MyPosts = (props) => {
    const postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const newPostElement = React.createRef();

    const onAddPost = () => {
        props.addPost();
    }

    const onPostChange = () => {
        const text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={object.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        ref={newPostElement}
                        cols="30"
                        rows="10"
                        onChange={onPostChange}
                        value={props.newPostText}>
                    </textarea>
                </div>
                <div>
                    {/*current ссылается на нативный html element*/}
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={object.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;

