import { ActionsType } from "../actions/auth";

// ============ вариант 1 как можно протипизировать ============
// export type InitialStateType1 = {
//   userId: number | null,
//   email: string | null,
//   login: string | null,
//   isAuth: boolean ,
//   isRegister: boolean,
// };

// const initialState: InitialStateType = {
//   userId: null,
//   email: null,
//   login: null,
//   isAuth: false,
//   isRegister: false,
// };
// ============ вариант 1 как можно протипизировать ============
// ============ вариант 2 как можно протипизировать ============
const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  isRegister: false,
};

type InitialStateType = typeof initialState;
// ============ вариант 2 как можно протипизировать ============
const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_IS_REGISTER": {
      return {
        ...state,
        isRegister: !state.isRegister,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
