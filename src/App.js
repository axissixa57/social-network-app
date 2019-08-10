import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
  // вернёт что-то вроде React.createElement, jsx разметка
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          {/*роутер связан с NavLink компонентой, кот. наход-ся в Navbar*/}
          {/*роутер следит за изменением url, если он изменяется он отрисовывет, то что ему назначено*/}
          <Route path='/profile' render={ () => <Profile /> } />
          {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
          <Route exact path='/dialogs' render={ () => <DialogsContainer /> } />
          <Route path='/users' render={ () => <UsersContainer />} />
        </div>
      </div>
  )
}

export default App;
