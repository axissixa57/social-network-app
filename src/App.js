import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';


const App = () => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile' render={ () => <Profile/> } />
          {/* exact необоходит для точного совпадения, чтобы при клике /dialogs/1 не подгружался компонент Dialogs */}
          <Route exact path='/dialogs' render={ () => <Dialogs/> } />
          <Route path='/news' component={Dialogs} />
          <Route path='/music' component={Dialogs} />
          <Route path='/settings' component={Dialogs} />
        </div>
      </div>
  )
}

export default App;
