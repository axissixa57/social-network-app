import {authAPI} from "../../api/api";

export const SET_USER_DATA = 'SET_USER_DATA';

export const setAuthUserData = (userId, email, login) => ({
    type: SET_USER_DATA,
    data: {
        userId,
        email,
        login
    }
});

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, email, login));
            }
        });
}