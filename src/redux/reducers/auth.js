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
                ...action.payload,
            }
        }
        default:
            return state;
    }
}

export default auth;