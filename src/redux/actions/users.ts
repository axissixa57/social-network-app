import { Dispatch } from "redux";
import { usersAPI } from "../../api/users-api";
import { UserType } from "../../types/types";
import { InferActionsTypes, BaseThunkType } from "../store";

export type ActionsTypes = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const actions = {
  follow: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),
  unfollow: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<UserType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),
  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),
  setUsersTotalCount: (totalUsersCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      count: totalUsersCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

// thunks
// redux store (а именно thunkMiddleware) запустит вложенную ф-цию и закинет dispatch, а параметры с внешней ф-ции придут через замыкание
// store.dispatch(thunk) -> thunkMiddleware -> store.dispatch(actions) -> reducers -> new state -> rerenderComponent
export const getUsersThunkCreator = (
  page: number,
  pageSize: number
): ThunkType => {
  return async (dispatch: DispatchType) => {
    // когда данных нет, отправляем true, соответственно preloader будет грузиться на стр. (UserContainer)
    dispatch(actions.toggleIsFetching(true));
    // dispatch(setCurrentPage(page)); ???
    const data = await usersAPI.getUsers(page, pageSize);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);
  // если на сервере (в бд) есть такой пользователь (либо нет ошибок) то подписываемся/отписываемся на пользователя
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }

  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId: number) => {
  return async (dispatch: DispatchType) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.follow
    );
  };
};

export const unfollowThunkCreator = (userId: number) => {
  return async (dispatch: DispatchType) => {
    await _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollow
    );
  };
};
