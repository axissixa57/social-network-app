import { profileAPI } from "../../api/profile-api";
import { usersAPI } from "../../api/users-api";
import { ProfileType, PhotosType } from "../../types/types";
import { InferActionsTypes, BaseThunkType } from "../store";

export type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

export const actions = {
  addPostActionCreator: (text: string) =>
    ({
      type: "ADD_POST",
      newPostText: text,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: "SET_USER_PROFILE",
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: "SET_STATUS",
      status,
    } as const),
  // для тестов
  deletePost: (postId: number) =>
    ({
      type: "DELETE_POST",
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: "SAVE_PHOTO_SUCCESS",
      photos,
    } as const),
};

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  const response = await usersAPI.getProfile(userId);

  dispatch(actions.setUserProfile(response));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  // response.data придёт string вместо obj
  dispatch(actions.setStatus(response));
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);

  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.photos));
  }
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);

  if (response.resultCode === 0) {
    dispatch(actions.setStatus(status));
  }
};
