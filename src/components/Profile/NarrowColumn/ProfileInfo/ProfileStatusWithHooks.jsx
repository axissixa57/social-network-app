import React, {useState, useEffect} from 'react';
import styles from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    // hook - используется state и возможность его изменения внутри ф-ции ProfileStatusWithHooks
    // useState - возращает массив, в кот. первый элемент заданное значение, а 2-ой ф-ция кот. меняет его
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        // отправляем на значение на сервер когда вышли из редактируемого мода
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className={styles.pageStatus}>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || ''}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;