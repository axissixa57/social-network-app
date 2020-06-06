import {authAPI} from "../../api/api";
import {stopSubmit} from "redux-form";

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_IS_REGISTER = 'SET_IS_REGISTER';

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        userId,
        email,
        login,
        isAuth
    }
});

export const setIsRegister = () => ({
    type: SET_IS_REGISTER
});

export const getAuthUserData = () => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        })
};

export const register = (email, login, password) => (dispatch) => {
    authAPI.register(email, login, password)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsRegister());
                // localStorage.setItem('x-access-token', response.data.accessToken);
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('register', {_error: message}));
            }
        });
};

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                // localStorage.setItem('x-access-token', response.data.accessToken);
                dispatch(getAuthUserData());
            } else {
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
        });
};

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                localStorage.removeItem('x-access-token');
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
};