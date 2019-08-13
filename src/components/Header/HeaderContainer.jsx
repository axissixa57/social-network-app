import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData, setAuthUserData} from "../../redux/actions/auth";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth,
    login: state.authReducer.login,
});

export default connect(mapStateToProps, {
    setAuthUserData,
    getAuthUserData
})(HeaderContainer);