import {SET_USER_DATA, SET_IS_REGISTER} from "../actions/auth";

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isRegister: false
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case SET_IS_REGISTER: {
            return {
                ...state,
                isRegister: !state.isRegister
            }
        }
        default:
            return state;
    }
};

export default auth;