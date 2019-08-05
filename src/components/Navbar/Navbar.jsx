import React from 'react';
// подстрока .module. означает, что мы придаём css файлу некторые преимущества, чтобы избежать конфликта имен в атрибуте className в разных компонентах
// object - это js-объект, кот. хранит ключ - наше имя className-a (например className='item'), а значение генерируется в например 'Navbar_item__sUVXx'
// в итоге в bundle.js (в конечном файле скопилированным webpack) - имя className будет в виде Component_наше-имя-заданное-классу__набор-рандомных-символов
import object from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={object.nav}>
            <div className={object.item}>
                <a>Profile</a>
            </div>
            <div className={object.item}>
                <a>Messages</a>
            </div>
            <div className={object.item}>
                <a>News</a>
            </div>
            <div className={object.item}>
                <a>Music</a>
            </div>
            <div className={object.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}

export default Navbar;