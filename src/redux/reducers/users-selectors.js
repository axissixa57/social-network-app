import {createSelector} from "reselect";

export const getUsersSelector = (state) => {
    return state.usersReducer.users;
};

// createSelector - ф-ция из библиотеки reselect, кот. возращает селектор
// state приходит в getUsersSelector, оттуда возращается значение (массив например), дальше он попадает в колбек createSelector-a
// там создаётся типо кэш, куда записывается наш массив, т.о. мы не перерисовываем компоненту, даже если эти значения меняются с помощью например возрата нового массива (.filter)
export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersReducer.pageSize;
};

export const getTotalUsersCount = (state) => {
    return state.usersReducer.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.usersReducer.currentPage;
};

export const getIsFetching = (state) => {
    return state.usersReducer.isFetching;
};

export const getFollowingInProgress = (state) => {
    return state.usersReducer.followingInProgress;
};