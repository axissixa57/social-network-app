import React from 'react'; // Если заменим Component на PureComponent не придётся писать логику для shouldComponentUpdate, т.к. там уже всё прописано
import object from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

// вынесено в отдельную переменную из-за ошибки зацикливания
const maxLength10 = maxLengthCreator(10);

const MyPosts = props => {
    console.log('RENDER Myposts');
    const postsElements =
        props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    const addPostMessage = (value) => {
        props.addPost(value.newPostElement);
    };

    return (
        <div className={`${object.postsBlock}`}>
            <div className='page-block'>
                <PostMessageTextAreaFormRedux onSubmit={addPostMessage}/>
            </div>
            <div className={object.posts}>
                <div className={`${object.postsHeader} page-block`}>
                    <h3>My posts</h3>
                </div>
                <div className={object.wallPosts}>{postsElements}</div>
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
                        cols="70"
                        rows="5"
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

