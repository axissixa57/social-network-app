import {getAuthUserData} from "../actions/auth";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    // dispatch, если нужно может вернуть значение, а конкретно promise (например, в thunk-e getAuthUserData(), если стоит return ...)
    const promise = dispatch(getAuthUserData()); // Promise {<pending>}
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
};

export default app;