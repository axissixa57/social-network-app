import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/reducers/app";
import Preloader from "./components/common/Preloader/Preloader";

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
                    <Route exact path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
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

// оборачиваем в hoc withRouter для корректной работы внутринних Routes
export default compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter
)(App);