import React from 'react';
import styles from './FormsControls.module.css'

// в props приходят {input, meta, placeholder, col, row, ...}
// с помощью деструктуризации мы вырезаем часть из пропсов { input, meta, ...props}
// и в props уже останется {placeholder, col, row, ...}
const FormControl = ({input, meta, child, ...props}) => {
    // touched, если фокус попал в текстареа, meta.error приходит из ф-ции(возращаемое значение), кот. мы создали в validators
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {/*children - это всё то что содержится внутри тега*/}
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    {/*в пропсах сидят лишние значения, а нам нужны только кот. приходят в input*/}
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};

// export const Textarea = ({ input, meta, ...props}) => {
//
//     const hasError = meta.touched && meta.error
//
//     return (
//         <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
//
//             <div>
//                 <textarea {...input} {...props}/>
//             </div>
//             { hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
//
// export const Input = ({ input, meta, ...props}) => {
//     // touched, если фокус попал в текстареа, meta.error приходит из ф-ции(возращаемое значение), кот. мы создали в validators
//     const hasError = meta.touched && meta.error
//
//     return (
//         <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
//             {/*в пропсах сидят лишние значения, а нам нужны только кот. приходят в input*/}
//             <div>
//                 <input {...input} {...props}/>
//             </div>
//             { hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }