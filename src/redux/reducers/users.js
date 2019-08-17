import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    UNFOLLOW,
    TOGGLE_IS_FOLLOWING_PROGRESS
} from "../actions/users";

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    // массив нужен чтобы хранить id пользователя на кот. подписываем / отписываемся, чтобы disable только 1 кнопку
    followingInProgress: [],
    fake: 10
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'FAKE' : return {...state, fake: state.fake + 1}
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            };
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            };
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            };
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    // когда true закидываем id в массив, т.е. disabled кнопку (= true)
                    [...state.followingInProgress, action.userId]
                    // когда false выкидываем id и у кнопки disabled = false
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        }
        default:
            return state;
    }
}

export default users;