import React from 'react';
import { NavLink } from 'react-router-dom';
// подстрока .module. означает, что мы придаём css файлу некторые преимущества, чтобы избежать конфликта имен в атрибуте className в разных компонентах
// object - это js-объект, кот. хранит ключ - наше имя className-a (например className='item'), а значение генерируется в например 'Navbar_item__sUVXx'
// в итоге в bundle.js (в конечном файле скопилированным webpack) - имя className будет в виде Component_наше-имя-заданное-классу__набор-рандомных-символов
import object from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={object.nav}>
            <div className={object.item}>
                <NavLink to='/profile' activeClassName={object.active}>My profile</NavLink>
            </div>
            <div className={object.item}>
                <NavLink to='/news' activeClassName={object.active}>News</NavLink>
            </div>
            <div className={object.item}>
                <NavLink to='/dialogs' activeClassName={object.active}>Messages</NavLink>
            </div>
            <div className={object.item}>
                <NavLink to='/users' activeClassName={object.active}>Friends</NavLink>
            </div>
            <div className={object.item}>
                <NavLink to='/music' activeClassName={object.active}>Music</NavLink>
            </div>
            <div className={object.item}>
                <NavLink to='/settings' activeClassName={object.active}>Settings</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;