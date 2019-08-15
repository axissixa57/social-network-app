import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {
     return (
         // handleSubmit приходит из redux-form и мы доверяем ему обработку submita
         // в нём поумолчанию при отправке submit вызывается e.preventDefault,
         // собираются все данные из полей кот. мы ввели в объект и передаются в props.onSubmit({...})
         // при возникновении ошибка: You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop
         // необходимо компоненте кот. стоит выше <LoginReduxForm/> передать onSubmit={}
         <form onSubmit={props.handleSubmit}>
             <div>
                 {/*заменяем input на Field из redux-form, все отрибуты пойдут в input, необходимо для отображения в store.state.form, благодаря атрибуту name, значени он появятся в store.state.form*/}
                 <Field
                     name='email'
                     placeholder='Email'
                     validate={[required]}
                     component={Input}
                 />
             </div>
             <div>
                 <Field
                     type="password"
                     name='password'
                     placeholder='Password'
                     validate={[required]}
                     component={Input}
                 />
             </div>
             <div>
                 <Field type="checkbox" name='rememberMe' placeholder='Login' component={Input}/>remember me
             </div>
             <div>
                 <button>Login</button>
             </div>
         </form>
     );
}

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