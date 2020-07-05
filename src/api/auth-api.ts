import {
  instance,
  LoginResponseDataType,
  APIResponseType,
  MeResponseDataType,
  ResultCodesEnum,
} from "./api";

export const authAPI = {
  me() {
    // https://social-network.samuraijs.com/docs#auth_me_get
    // example {resultCode: 0, messages: [], data: {id: 2, email: 'blabla@bla.bla', login: 'samurai'}}
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data); // типизация говорит что get запрос вернёт объект MeResponseType + AxiosResponse<MeResponseType> - это промис кот. вернёт нам объект вида MeResponseType после выполнения
  },
  register(email: string, login: string, password: string) {
    return instance.post(`auth/register`, { email, login, password });
  },
  login(email: string, password: string, rememberMe = false) {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodesEnum>>(
        `auth/login`,
        { email, password, rememberMe }
      )
      .then((res) => res.data); // внутри response в свойстве data ожидаем увидеть такой тип - LoginResponseType
  },
  // https://social-network.samuraijs.com/docs#auth_login_delete
  logout() {
    return instance.delete(`auth/login`);
  },
};
