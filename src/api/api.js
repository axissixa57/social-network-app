import * as axios from "axios";

const instance = axios.create({
    // `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'f1ea0441-d702-44bf-808f-60ba98040921'
    }
});

export const usersAPI = {
    // идентично записи getUsers: getUsers()
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                // передаём Promise.resolve дальше, если стоит return то мы можешь сколько угодно раз передавать значения
                return res.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        // если переносим метод, а некот. люди неосводемлены, можно сделать т.о.
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        // отправляем на сервер (req.body) - объект
        return instance.put(`profile/status/`, {status: status});
    }
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
};