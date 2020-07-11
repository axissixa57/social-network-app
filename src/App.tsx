import React, { Component } from "react";
import { Route, withRouter, BrowserRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { compose } from "redux";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/reducers/app";
import { withSuspense } from "./hoc/withSuspense";
import store, { AppStateType } from "./redux/store";
import "./App.css";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

class AppComponent extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp(); // Is current user authorized
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    // вернёт что-то вроде React.createElement, jsx разметка
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          {/*роутер связан с NavLink компонентой, кот. наход-ся в Navbar*/}
          {/*роутер следит за изменением url, если он изменяется он отрисовывет, то что ему назначено*/}
          {/*'/profile/:userId?' знак ? говорит что параметр не обязателен, и отрисует странницу, без знака ничего не отрисует*/}
          <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
          {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
          <Route exact path="/dialogs" render={() => <SuspendedDialogs />} />
          <Route
            path="/users"
            render={() => <UsersContainer pageTitle="Friends" />}
          />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.appReducer.initialized,
  };
};

// оборачиваем в hoc withRouter для корректной работы внутринних Routes (прокидываются доп. пропсы типо match,locate,history. Будет ошибка если не оберуть компоненту <AppComponent/> - BrowserRouter-ом
const AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }), // initializeApp: () => dispatch(initializeApp())
  withRouter
)(AppComponent);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
