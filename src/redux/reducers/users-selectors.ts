import {createSelector} from "reselect";
import { AppStateType } from "../store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersReducer.users;
};

// createSelector - ф-ция из библиотеки reselect, кот. возращает селектор
// state приходит в getUsersSelector, оттуда возращается значение (массив например), дальше он попадает в колбек createSelector-a
// там создаётся типо кэш, куда записывается наш массив, т.о. мы не перерисовываем компоненту, даже если эти значения меняются с помощью например возрата нового массива (.filter)
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
});

export const getPageSize = (state: AppStateType) => {
    return state.usersReducer.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersReducer.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersReducer.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersReducer.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersReducer.followingInProgress;
};