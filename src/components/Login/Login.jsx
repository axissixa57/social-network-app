import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error}) => {
     return (
         // handleSubmit приходит из redux-form и мы доверяем ему обработку submit-a
         // в нём поумолчанию при отправке submit вызывается e.preventDefault,
         // собираются все данные из полей кот. мы ввели в объект и передаются в props.onSubmit({...})
         // при возникновении ошибка: You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop
         // необходимо компоненте кот. стоит выше <LoginReduxForm/> передать onSubmit={}
         // error - общая ошибка сработает, когда например неправильный пароль
         <form onSubmit={handleSubmit}>
             {createField('email', 'Email', [required], Input)}
             {createField('password', 'Password', [required], Input, {type: 'password'})}
             {createField('rememberMe', null, [], Input, {type: 'checkbox'}, 'remember me')}
             {error && <div className={styles.formSummaryError}>{error}</div>}
             <div>
                 <button>Login</button>
             </div>
         </form>
     );
};

// связуем со state из store без неё там пустой объект
const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm); // оборачиваем форму

const Login = (props) => {
    // сюда придут все значения из формы {login: "asd", password: "asd", rememberMe: true}
    const onSubmit = (formData) => {
        const {email, password, rememberMe} = formData;
        props.login(email, password, rememberMe);
    };

    // данные из mapStateToProps
    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    };
};

// законекченную переменную експортируем
export default connect(mapStateToProps, {
    login
})(Login);