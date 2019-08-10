import React from 'react';
import {connect} from "react-redux";

import MyPosts from './MyPosts';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/actions/profile";

const mapStateToProps = (state) => {
    return {
        posts: state.profileReducer.posts,
        newPostText: state.profileReducer.newPostText,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateNewPostText: (text) => dispatch(updateNewPostTextActionCreator(text)),
        addPost: () => dispatch(addPostActionCreator()),
    };
};

const MyPostsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;

