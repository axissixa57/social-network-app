import { getAuthUserData } from "../actions/auth";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
  initialized: false,
};

const app = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS: {
      return {
        ...state,
        initialized: true
      };
    }
    default:
      return state;
  }
};

type initializedSuccessActionType = {
  // string не пойдёт т.к. action type значение можно изменить на другую строку, а если взять тип у константы, кот. является строкой, то тип будет именно той строкой, кот. записана в const 
  // идентично записи type: "INITIALIZED_SUCCESS" - т.е. любой другой строкой быть не может. именно "INITIALIZED_SUCCESS"
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
  // dispatch, если нужно может вернуть значение, а конкретно promise (например, в thunk-e getAuthUserData(), если стоит return ...)

  const promise = dispatch(getAuthUserData()); // Promise {<pending>}

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default app;
