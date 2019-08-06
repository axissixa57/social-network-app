import React from 'react';
import { NavLink } from 'react-router-dom';

import object from '../Dialogs.module.css';

const DialogItem = (props) => {
    const path = `/dialogs/${props.id}`;

    return (
        <div className={`${object.dialog} ${object.active}`}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;