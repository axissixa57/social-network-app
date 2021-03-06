import { connect } from "react-redux";

import MyPosts from "./MyPosts";
import { actions } from "../../../../redux/actions/profile";

const mapStateToProps = (state) => {
  return {
    posts: state.profileReducer.posts,
    newPostText: state.profileReducer.newPostText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (text) => dispatch(actions.addPostActionCreator(text)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
