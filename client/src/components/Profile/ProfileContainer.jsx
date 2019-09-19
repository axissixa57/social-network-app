import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/actions/profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// прежде чем отрисовать jsx закидываем props, обрабатываем hoc-ами
class ProfileContainer extends React.Component {
    componentDidMount() {
        // id из url (/profile/123 -> 123)
        let userId = this.props.match.params.userId;
        // если в url нет айди, берём id чела кот. вошёл через логин
        if(!userId) {
            userId = this.props.authorizedUserID;

            if(!userId) {
                // если ни в url, ни за логинился нет id
                this.props.history.push('/login');
            }
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <Profile
            {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
        />
    }
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer.profile,
    status: state.profileReducer.status,
    authorizedUserID: state.authReducer.userId,
    isAuth: state.authReducer.isAuth
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile, // thunk
        getStatus,
        updateStatus
    }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);