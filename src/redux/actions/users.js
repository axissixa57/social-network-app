import {usersAPI} from "../../api/api";

export const SET_USERS = 'SET_USERS';
export const FOLLOW = 'ADD-FOLLOW';
export const UNFOLLOW = 'UNFOLLOW-NEW-POST-TEXT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

// action creators
export const setUsers = (users) => ({type: SET_USERS, users});
export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

// thunks
// redux store (а именно thunkMiddleware) запустит вложенную ф-цию и закинет dispatch, а параметры с внешней ф-ции придут через замыкание
// store.dispatch(thunk) -> thunkMiddleware -> store.dispatch(actions) -> reducers -> new state -> rerenderComponent
export const getUsersThunkCreator = (page, pageSize) => {
    return async (dispatch) => {
        // когда данных нет, отправляем true, соответственно preloader будет грузиться на стр. (UserContainer)
        dispatch(toggleIsFetching(true));
        // dispatch(setCurrentPage(page)); ???
        const data = await usersAPI.getUsers(page, pageSize);

        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setUsersTotalCount(data.totalCount));
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));

    const response = await apiMethod(userId);
    // если на сервере (в бд) есть такой пользователь (либо нет ошибок) то подписываемся/отписываемся на пользователя
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }

    dispatch(toggleFollowingProgress(false, userId));
};

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), follow);
    }
};

export const unfollowThunkCreator = (userId) => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollow);
    }
};