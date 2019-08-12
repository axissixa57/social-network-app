import {SET_USER_DATA} from "../actions/auth";

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        }
        default:
            return state;
    }
}

export default auth;