import { authAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

export const SET_USER_DATA = "SET_USER_DATA";
export const SET_IS_REGISTER = "SET_IS_REGISTER";

type SetAuthUserDataActionPayloadType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: {
    userId,
    email,
    login,
    isAuth,
  },
});

export const setIsRegister = () => ({
  type: SET_IS_REGISTER,
});

export const register = (email: string, login: string, password: string) => (
  dispatch: any
) => {
  authAPI.register(email, login, password).then((response: any) => {
    if (response.data.resultCode === 0) {
      dispatch(setIsRegister());
      // localStorage.setItem('x-access-token', response.data.accessToken);
    } else {
      const message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";
      dispatch(stopSubmit("register", { _error: message }));
    }
  });
};

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me();

  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean
) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe);

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    // специальный action (actionCreator) для обработки ошибок, например если неправильный пароль
    // _error специальное свойство для отслеживания общих ошибок
    const message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message })); // передаётся название определённой формы, кот. будет stop-ать
  }
};

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
