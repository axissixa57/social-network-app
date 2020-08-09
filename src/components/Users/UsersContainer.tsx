import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  getUsersThunkCreator,
  followThunkCreator,
  unfollowThunkCreator,
  actions,
} from "../../redux/actions/users";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "../../redux/reducers/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/store";
import { FilterType } from "../../redux/reducers/users";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type MapDispatchPropsType = {
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
  getUsersThunkCreator: (
    currentPage: number,
    pageSize: number,
    filter: FilterType
  ) => void;
  followThunkCreator: (userId: number) => void;
  unfollowThunkCreator: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType; // объединяем все типы пропросв воедино с помощью & (амперсанда)

class UsersContainer extends React.Component<PropsType> {
  // вызывается, когда jsx разметка отрисуется
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.getUsersThunkCreator(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.getUsersThunkCreator(pageNumber, pageSize, filter);
  };

  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsersThunkCreator(1, pageSize, filter);
  };

  render() {
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          onFilterChanged={this.onFilterChanged}
          users={this.props.users}
          follow={this.props.followThunkCreator}
          unfollow={this.props.unfollowThunkCreator}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// mapStateToProps срабатывает всегда когда меняется state, но перерисовка комонента кот. связан со свойствами из mapStateToProps не перерисовывается, до тех пор пока
// не измениться какое-то свойства внутри него. Идёт сравнение значений в этом объекте. Предыдущего с настоящим
const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      getUsersThunkCreator,
      followThunkCreator,
      unfollowThunkCreator,
      ...actions,
    }
  )
)(UsersContainer);
