import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {
    setUsersAC,
    followAC,
    unfollowAC,
    setCurrentPageAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC
} from "../../redux/actions/users";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
    // конструктор необязателен, props и так придут по умолчанию
    // constructor(props) {
    //     super(props);
    // }

    // вызывается, когда jsx разметка отрисуется
    componentDidMount() {
        // когда данных нет, отправляем true, соответственно preloader будет грузиться на стр.
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(res => {
                // когда данные пришли, отправляем false, preloader не будет грузиться на стр.
                this.props.toggleIsFetching(false);
                this.props.setUsers(res.data.items);
                this.props.setTotalUsersCount(res.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        pageSize: state.usersReducer.pageSize,
        totalUsersCount: state.usersReducer.totalUsersCount,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching
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
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
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
)(UsersContainer);