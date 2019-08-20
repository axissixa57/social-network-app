import React, {useState} from 'react';

const ProfileStatusWithHooks = (props) => {
    // hook - используется state и возможность его изменения внутри ф-ции ProfileStatusWithHooks
    // useState - возращает массив, в кот. первый элемент заданное значение, а 2-ой ф-ция кот. меняет его
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

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
        <div>
            {/*true && 1 - покажет 1*/}
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Дао дэ цзин — основополагающий источник учения и один из выдающихся памятников китайской мысли, оказавший большое влияние на культуру Китая и всего мира.'}</span>
                </div>
            }
            {editMode &&
            <div>
                {/*onBlur, когда фокус уходит с элемента*/}
                <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;