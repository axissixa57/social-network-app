import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/actions/profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

// прежде чем отрисовать jsx закидываем props, обрабатываем hoc-ами
class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) userId = 2;

        this.props.getUserProfile(userId);
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/> // 4
    }
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer.profile,
});

export default compose(
    connect(mapStateToProps, {
        getUserProfile // thunk
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);