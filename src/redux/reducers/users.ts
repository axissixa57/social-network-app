import { ActionsTypes } from "../actions/users";
import { updateObjectInArray } from "../../utils/object-helpers";
import { UserType } from "../../types/types";

const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  // массив нужен чтобы хранить id пользователя на кот. подписываем / отписываемся, чтобы disable только 1 кнопку
  followingInProgress: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter

const users = (state = initialState, action: ActionsTypes): InitialState => {
  switch (action.type) {
    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    case "FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "SN/USERS/SET_FILTER": {
      return { ...state, filter: action.payload };
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? // когда true закидываем id в массив, т.е. disabled кнопку (= true)
            [...state.followingInProgress, action.userId]
          : // когда false выкидываем id и у кнопки disabled = false
            state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

export default users;
