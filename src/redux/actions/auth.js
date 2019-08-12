export const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthUserData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login
    }
});