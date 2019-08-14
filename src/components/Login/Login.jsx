import React from 'react';
import {Field, reduxForm} from "redux-form"; // hoc

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
                 <Field name={'login'} placeholder={'Login'} component={'input'}/>
             </div>
             <div>
                 <Field name={'password'} placeholder={'Password'} component={'input'}/>
             </div>
             <div>
                 <Field type={"checkbox"} name={'rememberMe'} placeholder={'Login'} component={'input'}/>remember me
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
})(LoginForm) // оборачиваем форму

const Login = (props) => {
    // сюда придут все значения из формы {login: "asd", password: "asd", rememberMe: true}
    const onSubmit = (formData) => {

    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;