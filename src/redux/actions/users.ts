import { usersAPI } from "../../api/api";
import { UserType } from "../../types/types";

export const SET_USERS = "SET_USERS";
export const FOLLOW = "ADD-FOLLOW";
export const UNFOLLOW = "UNFOLLOW-NEW-POST-TEXT";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
export const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type SetUsersActionType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
type FollowActionType = {
  type: typeof FOLLOW;
  userId: number;
};
type UnfollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};

// action creators
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
  type: SET_USERS,
  users,
});
export const follow = (userId: number): FollowActionType => ({
  type: FOLLOW,
  userId,
});
export const unfollow = (userId: number): UnfollowActionType => ({
  type: UNFOLLOW,
  userId,
});
export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setUsersTotalCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});
export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

// thunks
// redux store (а именно thunkMiddleware) запустит вложенную ф-цию и закинет dispatch, а параметры с внешней ф-ции придут через замыкание
// store.dispatch(thunk) -> thunkMiddleware -> store.dispatch(actions) -> reducers -> new state -> rerenderComponent
export const getUsersThunkCreator = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    // когда данных нет, отправляем true, соответственно preloader будет грузиться на стр. (UserContainer)
    dispatch(toggleIsFetching(true));
    // dispatch(setCurrentPage(page)); ???
    const data = await usersAPI.getUsers(page, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);
  // если на сервере (в бд) есть такой пользователь (либо нет ошибок) то подписываемся/отписываемся на пользователя
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }

  dispatch(toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      follow
    );
  };
};

export const unfollowThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollow
    );
  };
};
