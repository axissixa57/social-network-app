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
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/reducers/users-selectors";

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
        // console.log('render UserContainer');
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

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersReducer.users,
//         pageSize: state.usersReducer.pageSize,
//         totalUsersCount: state.usersReducer.totalUsersCount,
//         currentPage: state.usersReducer.currentPage,
//         isFetching: state.usersReducer.isFetching,
//         followingInProgress: state.usersReducer.followingInProgress
//     };
// };

// mapStateToProps срабатывает всегда когда меняется state, но перерисовка комонента кот. связан со свойствами из mapStateToProps не перерисовывается, до тех пор пока
// не измениться какое-то свойства внутри него. Идёт сравнение значений в этом объекте. Предыдущего с настоящим
const mapStateToProps = (state) => {
    // console.log('mapStateToProps UserContainer');
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    };
};

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator
    }),
    withAuthRedirect
)(UsersContainer);