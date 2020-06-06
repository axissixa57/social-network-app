import React from 'react';
import styles from './FormsControls.module.css';
import {Field} from "redux-form";

// в props приходят {input, meta, placeholder, col, row, ...}
// с помощью деструктуризации мы вырезаем часть из пропсов { input, meta, ...props}
// и в props уже останется {placeholder, col, row, ...}
// children - это всё то что содержится внутри тега
// meta: {touched, error} - внутренняя деструктуризация
const FormControl = ({input, meta: {touched, error}, children}) => {
    // touched, если фокус попал в textarea, meta.error приходит из ф-ции(возращаемое значение), кот. мы создали в validators
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props; /*в пропсах сидят лишние значения, а нам нужны только кот. приходят в input*/
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

/*заменяем input на Field из redux-form, все атрибуты пойдут в input, необходимо для отображения в store.state.form, благодаря атрибуту name, значени появятся в store.state.form*/
export const createField = (name, placeholder, validators, component, props = {}, text = '') => (
    <div>
        <Field
            name={name}
            placeholder={placeholder}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </div>
);