import React from 'react';
import object from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={object.header}>
            <img src="" alt="" />

            <div className={object.loginBlock}>
                { props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <div>
                        <NavLink style={{marginRight: '15px'}} to={'/register'}>Register</NavLink>
                        <NavLink to={'/login'}>Login</NavLink>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header;