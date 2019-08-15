import React from 'react';

import object from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

// вынесено в отдельную переменную из-за ошибки зацикливания
const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {
    const postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const addPostMessage = (value) => {
        props.addPost(value.newPostElement);
    }

    return (
        <div className={object.postsBlock}>
            <h3>My posts</h3>
            <PostMessageTextAreaFormRedux onSubmit={addPostMessage}/>
            <div className={object.posts}>
                {postsElements}
            </div>
        </div>
    )
};

const PostMessageTextArea = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        name='newPostElement'
                        cols="30"
                        rows="10"
                        placeholder='Enter your message'
                        // в массиве название ф-ций валидаторов
                        validate={[required, maxLength10]}
                        // ссылка на компонент в др. файле
                        component={Textarea}
                    />
                </div>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const PostMessageTextAreaFormRedux = reduxForm({
    form: 'postMessageTextArea'
})(PostMessageTextArea);

export default MyPosts;

