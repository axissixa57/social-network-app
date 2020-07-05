import { getAuthUserData } from "../actions/auth";
import { InferActionsTypes } from "../store";

const initialState = {
  initialized: false,
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "INITIALIZED_SUCCESS": {
      return {
        ...state,
        initialized: true,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: "INITIALIZED_SUCCESS" } as const),
};

export const initializeApp = () => (dispatch: any) => {
  // dispatch, если нужно может вернуть значение, а конкретно promise (например, в thunk-e getAuthUserData(), если стоит return ...)

  const promise = dispatch(getAuthUserData()); // Promise {<pending>}

  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
