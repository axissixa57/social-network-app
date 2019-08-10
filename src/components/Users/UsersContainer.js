import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {setUsersAC, followAC, unfollowAC, setCurrentPageAC, setUsersTotalCountAC} from "../../redux/actions/users";

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        }
    };
};

// connect использует ф-цию store - subscribe(),
// и каждый connect, кот. мы оборачиваем он локально подписывается на store
// соответственно, когда мы что-то dispatch отрабает вызов подписки, кот. находится в массиве listeners в store, кот попал туда
// благодаря subscribe. Далее store меняется в последстии чего попалает в mapStateToProps и компонента перерисовывается,
// если state в store не поменялся - компонента не перерисуется
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);