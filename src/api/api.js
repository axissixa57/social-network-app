import axios from "axios";

class HttpService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json; charset=UTF-8'
        };

        this.service = axios.create({
            baseURL: this.baseUrl,
            withCredentials: true
        });
    }

    request({ method, url, data, headers }) {
        return this.service.request({
            method,
            url,
            responseType: 'json',
            data,
            headers: {...headers, ...this.headers}
        })
            .then(({ data }) => data);
    }

    get(url, headers = {}) {
        return this.service.request({
            method: 'get',
            url,
            data: null,
            headers: {...headers, ...this.headers}
        })
            .then(({ data }) => data);
    }

    // url ='login', data = {username: "123", password: "123"}
    post(url, data, headers = {}) {
        return this.request({
            method: 'post',
            url,
            data,
            headers
        });
    }

    put(url, data, headers = {}) {
        return this.request({
            method: 'put',
            url,
            data,
            headers
        });
    }

    delete(url, data, headers = {}) {
        return this.request({
            method: 'delete',
            url,
            data,
            headers
        });
    }
}

const httpClient = new HttpService('http://127.0.0.1:3001/api/1.0/'); // process.env.API_URL

export const usersAPI = {
    // идентично записи getUsers: getUsers()
    getUsers(currentPage = 1, pageSize = 10) {
        return httpClient.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data;
            });
    },
    follow(userId) {
        return httpClient.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return httpClient.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        // если переносим метод, а некот. люди неосводемлены, можно сделать т.о.
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId);
    }
};

export const profileAPI = {
    getProfile(userId) {
        return httpClient.get(`profile/${userId}`);
    },
    getStatus(userId) {
        return httpClient.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return httpClient.put(`profile/status/`, {status: status});
    }
};

export const authAPI = {
    me() {
        return httpClient.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return httpClient.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return httpClient.delete(`auth/login`);
    },
};