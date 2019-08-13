import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.authReducer.isAuth
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Redirect to={'/login'}/>
            return <Component {...this.props} />
        }
    }

    // второй коннект необходим чтобы не засорять первый (чтобы не кидать значения из state другого reducer-a)
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}