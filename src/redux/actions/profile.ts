import { profileAPI, usersAPI } from "../../api/api";
import { ProfileType, PhotosType } from "../reducers/profile";

export const ADD_POST = "ADD-POST";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_STATUS = "SET_STATUS";
export const DELETE_POST = "DELETE_POST";
export const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};
type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};
type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const addPostActionCreator = (
  text: string
): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText: text,
});
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});
// для тестов
export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);

  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  // response.data придёт string вместо obj
  dispatch(setStatus(response.data));
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
