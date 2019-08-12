import React from 'react';
import {connect} from 'react-redux';
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsersThunkCreator, followThunkCreator, unfollowThunkCreator
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
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);

        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
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
                follow={this.props.followThunkCreator}
                unfollow={this.props.unfollowThunkCreator}
                followingInProgress={this.props.followingInProgress}
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
        isFetching: state.usersReducer.isFetching,
        followingInProgress: state.usersReducer.followingInProgress
    };
};

// connect использует ф-цию store - subscribe(),
// и каждый connect, кот. мы оборачиваем он локально подписывается на store
// соответственно, когда мы что-то dispatch отрабает вызов подписки,
// кот. находится в массиве listeners в store, кот попал туда благодаря subscribe.
// Далее store меняется в последстии чего попалает в mapStateToProps и компонента перерисовывается,
// если state в store не поменялся - компонента не перерисуется
export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
})(UsersContainer);