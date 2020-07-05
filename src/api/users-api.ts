import { instance, GetItemsType, APIResponseType } from "./api";
import { profileAPI } from "./profile-api";

export const usersAPI = {
  // идентично записи getUsers: getUsers()
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        // передаём Promise.resolve дальше, если стоит return то мы можешь сколько угодно раз передавать значения
        return res.data;
      });
  },
  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
  },
  getProfile(userId: number) {
    // если переносим метод, а некот. люди неосводемлены, можно сделать т.о.
    console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getProfile(userId);
  },
};
