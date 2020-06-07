import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  // `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "101b805d-f8a4-4d2d-8813-46ece1a1ecb1",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCapctha {
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum | ResultCodeForCapctha;
  messages: Array<string>;
};

export const usersAPI = {
  // идентично записи getUsers: getUsers()
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        // передаём Promise.resolve дальше, если стоит return то мы можешь сколько угодно раз передавать значения
        return res.data;
      });
  },
  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId: number) {
    // если переносим метод, а некот. люди неосводемлены, можно сделать т.о.
    console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    // отправляем на сервер (req.body) - объект
    return instance.put(`profile/status/`, { status: status });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const authAPI = {
  me() {
    // https://social-network.samuraijs.com/docs#auth_me_get
    // example {resultCode: 0, messages: [], data: {id: 2, email: 'blabla@bla.bla', login: 'samurai'}}
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data); // типизация говорит что get запрос вернёт объект MeResponseType + AxiosResponse<MeResponseType> - это промис кот. вернёт нам объект вида MeResponseType после выполнения
  },
  register(email: string, login: string, password: string) {
    return instance.post(`auth/register`, { email, login, password });
  },
  login(email: string, password: string, rememberMe = false) {
    return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe }).then(res => res.data); // внутри response в свойстве data ожидаем увидеть такой тип - LoginResponseType
  },
  // https://social-network.samuraijs.com/docs#auth_login_delete
  logout() {
    return instance.delete(`auth/login`);
  },
};
