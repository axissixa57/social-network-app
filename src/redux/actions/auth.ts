import { stopSubmit, FormAction } from "redux-form";
import { ResultCodesEnum } from "../../api/api";
import { authAPI } from "../../api/auth-api";
import { BaseThunkType, InferActionsTypes } from "../store";

export type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SET_USER_DATA",
      payload: {
        userId,
        email,
        login,
        isAuth,
      },
    } as const),
  setIsRegister: () =>
    ({
      type: "SET_IS_REGISTER",
    } as const),
};

export const register = (
  email: string,
  login: string,
  password: string
): ThunkType => async (dispatch) => {
  const response = await authAPI.register(email, login, password);

  if (response.data.resultCode === 0) {
    dispatch(actions.setIsRegister());
    // localStorage.setItem('x-access-token', response.data.accessToken);
  } else {
    const message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("register", { _error: message }));
  }
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();

  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, login, email } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean
): ThunkType => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    // специальный action (actionCreator) для обработки ошибок, например если неправильный пароль
    // _error специальное свойство для отслеживания общих ошибок
    const message = data.messages.length > 0 ? data.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: message })); // передаётся название определённой формы, кот. будет stop-ать
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
