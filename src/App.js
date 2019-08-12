import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {
  // вернёт что-то вроде React.createElement, jsx разметка
  return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          {/*роутер связан с NavLink компонентой, кот. наход-ся в Navbar*/}
          {/*роутер следит за изменением url, если он изменяется он отрисовывет, то что ему назначено*/}
          {/*'/profile/:userId?' знак ? говорит что параметр не обязателен, и отрисует странницу, без знака ничего не отрисует*/}
          <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
          {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
          <Route exact path='/dialogs' render={ () => <DialogsContainer /> } />
          <Route path='/users' render={ () => <UsersContainer />} />
        </div>
      </div>
  )
}

export default App;
