export const SET_USERS = 'SET_USERS';
export const FOLLOW = 'ADD-FOLLOW';
export const UNFOLLOW = 'UNFOLLOW-NEW-POST-TEXT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

export const setUsersAC = (users) => ({type: SET_USERS, users});
export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotalCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});