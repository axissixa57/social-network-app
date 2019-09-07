import React, {useState, useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {
    // hook - используется state и возможность его изменения внутри ф-ции ProfileStatusWithHooks
    // useState - возращает массив, в кот. первый элемент заданное значение, а 2-ой ф-ция кот. меняет его
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    // синхронизируем данными (синхронизация состояния) кот. пришли из пропросов: 1 раз придёт, пустая строка, 2 раз после того как компонента вмонтировалась, сработает useEffect (наподобии componentDidMound, также в useEffect работает componentDidUpdate)
    // [] массив нужен для того чтобы отрисовать один раз после вмонтирования, а значение в массиве, говорит что мы зависим от props.status, для обновления (componentDedUpdate),
    // если статус был не таким как раньше, то сработает useEffect
    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        // отправляем значение на сервер когда вышли из редактируемого мода
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {/*true && 1 - покажет 1*/}
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'Hello World!'}</span>
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