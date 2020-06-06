import * as axios from "axios";

const instance = axios.create({
    // `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '101b805d-f8a4-4d2d-8813-46ece1a1ecb1'
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
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

export const authAPI = {
    me() {
        // example {resultCode: 0, messages: [], data: {id: 2, email: 'blabla@bla.bla', login: 'samurai'}}
        return instance.get(`auth/me`)
    },
    register(email, login, password) {
        return instance.post(`auth/register`, {email, login, password});
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
};

// import axios from "axios";
//
// class HttpService {
//     constructor(baseUrl) {
//         this.baseUrl = baseUrl;
//         this.headers = {
//             'Content-Type': 'application/json; charset=UTF-8'
//         };
//
//         this.service = axios.create({
//             baseURL: this.baseUrl,
//             withCredentials: true
//         });
//     }
//
//     request({ method, url, data, headers }) {
//         return this.service.request({
//             method,
//             url,
//             responseType: 'json',
//             data,
//             headers: {...headers, ...this.headers}
//         })
//     }
//
//     get(url, headers = {}) {
//         return this.service.request({
//             method: 'get',
//             url,
//             data: null,
//             headers: {...headers, ...this.headers}
//         })
//     }
//
//     post(url, data, headers = {}) {
//         return this.request({
//             method: 'post',
//             url,
//             data,
//             headers: {...headers, ...this.headers}
//         });
//     }
//
//     put(url, data, headers = {}) {
//         return this.request({
//             method: 'put',
//             url,
//             data,
//             headers
//         });
//     }
//
//     delete(url, headers = {}) { // data,
//         return this.request({
//             method: 'delete',
//             url,
//             headers
//         });
//     }
// }
//
// const httpClient = new HttpService('https://social-network.samuraijs.com/api/1.0/');
//
// export const usersAPI = {
//     // идентично записи getUsers: getUsers()
//     getUsers(currentPage = 1, pageSize = 10) {
//         return httpClient.get(`users?page=${currentPage}&count=${pageSize}`)
//             .then(res => {
//                 return res.data;
//             });
//     },
//     follow(userId) {
//         return httpClient.post(`follow/${userId}`)
//     },
//     unfollow(userId) {
//         return httpClient.delete(`follow/${userId}`)
//     },
//     getProfile(userId) {
//         // если переносим метод, а некот. люди неосводемлены, можно сделать т.о.
//         console.warn('Obsolete method. Please use profileAPI object');
//         return profileAPI.getProfile(userId);
//     }
// };
//
// export const profileAPI = {
//     getProfile(userId) {
//         return httpClient.get(`profile/${userId}`);
//     },
//     getStatus(userId) {
//         return httpClient.get(`profile/status/${userId}`);
//     },
//     updateStatus(status) {
//         return httpClient.put(`profile/status/`, {status: status});
//     }
// };
//
// export const authAPI = {
//     me() {
//         return httpClient.get(`auth/me`, {'x-access-token':localStorage.getItem('x-access-token') || ''})
//     },
//     register(email, login, password) {
//         return httpClient.post(`auth/register`, {email, login, password});
//     },
//     login(email, password, rememberMe = false) {
//         return httpClient.post(`auth/login`, {email, password, rememberMe}, {'x-access-token':localStorage.getItem('x-access-token') || ''});
//     },
//     logout() {
//         return httpClient.delete(`auth/login`);
//     },
// };