import { Dispatch } from "redux";
import { usersAPI } from "../../api/users-api";
import { UserType } from "../../types/types";
import { InferActionsTypes, BaseThunkType } from "../store";
import { APIResponseType } from "../../api/api";
import { FilterType } from "../reducers/users";

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
  setFilter: (filter: FilterType) =>
    ({ type: "SN/USERS/SET_FILTER", payload: filter } as const),
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
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch: DispatchType) => {
    // когда данных нет, отправляем true, соответственно preloader будет грузиться на стр. (UserContainer)
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    const data = await usersAPI.getUsers(
      page,
      pageSize,
      filter.term,
      filter.friend
    );

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersTotalCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));

  const response = await apiMethod(userId);
  // если на сервере (в бд) есть такой пользователь (либо нет ошибок) то подписываемся/отписываемся на пользователя
  if (response.resultCode === 0) {
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
