import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {compose} from "redux";

import './App.css';

import Navbar from './components/Navbar/Navbar';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Preloader from "./components/common/Preloader/Preloader";

import {initializeApp} from "./redux/reducers/app";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp(); // Is current user authorized
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>;
        }
        // вернёт что-то вроде React.createElement, jsx разметка
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*роутер связан с NavLink компонентой, кот. наход-ся в Navbar*/}
                    {/*роутер следит за изменением url, если он изменяется он отрисовывет, то что ему назначено*/}
                    {/*'/profile/:userId?' знак ? говорит что параметр не обязателен, и отрисует странницу, без знака ничего не отрисует*/}
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                    {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
                    <Route exact path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/users' render={() => <UsersContainer pageTitle="pageTitle to check OwnPropsType"/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/register' render={() => <Register/>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.appReducer.initialized
    }
};

// оборачиваем в hoc withRouter для корректной работы внутринних Routes (прокидываются доп. пропсы типо match,locate,history. Будет ошибка если не оберуть компоненту <App/> - BrowserRouter-ом
export default compose(
    connect(mapStateToProps, {initializeApp}), // initializeApp: () => dispatch(initializeApp())
    withRouter
)(App);
