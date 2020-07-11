import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store";

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.authReducer.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};
type DispatchPropsType = {};

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"} />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  // второй коннект необходим чтобы не засорять первый (чтобы не кидать значения из state другого reducer-a)
  return connect(mapStateToPropsForRedirect)(RedirectComponent);
}
