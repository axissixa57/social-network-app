import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/store";

type MapStatePropsType = {
  isAuth: boolean;
};
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void;
};
export type LoginFormValuesType = {
  rememberMe: boolean;
  password: string;
  email: string;
};
export type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>; // Extract - говорит о том что забирёт то значение, кот. есть и влевой части и вправой, в данном случае string, т.к. keyof может вернуть помимо string ещё symbol и number

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({ // таким образом прокидываем пропсы кот. необходимы redux-form (<InjectedFormProps>) + докидываем наши пропсы - <InjectedFormProps<LoginFormValuesType>>. с видоса можно ещё так <InjectedFormProps<LoginFormValuesType, {captchaUrl: string | null}> & {captchaUrl: string | null}> - <InjectedFormProps<LoginFormValuesType, {captchaUrl: string | null}> - доп. данные для самой редакс форма + & {captchaUrl: string | null} - для самой компоненты
  handleSubmit,
  error,
}) => {
  return (
    // handleSubmit приходит из redux-form и мы доверяем ему обработку submit-a
    // в нём поумолчанию при отправке submit вызывается e.preventDefault,
    // собираются все данные из полей кот. мы ввели в объект и передаются в props.onSubmit({...})
    // при возникновении ошибка: You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop
    // необходимо компоненте кот. стоит выше Login - <LoginReduxForm onSubmit={onSubmit}/> передать onSubmit={}
    // error - общая ошибка сработает, когда например неправильный пароль
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("email", "Email", [required], Input)}
      {createField<LoginFormValuesTypeKeys>("password", "Password", [required], Input, {
        type: "password",
      })}
      {createField<LoginFormValuesTypeKeys>(
        "rememberMe",
        undefined,
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

// связуем со state из store без неё там пустой объект
const LoginReduxForm = reduxForm<LoginFormValuesType>({
  form: "login", // a unique name for the form
})(LoginForm); // оборачиваем форму

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  // сюда придут все значения из формы {login: "asd", password: "asd", rememberMe: true}
  const onSubmit = (formData: LoginFormValuesType) => {
    const { email, password, rememberMe } = formData;
    props.login(email, password, rememberMe);
  };

  // данные из mapStateToProps
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};

// законекченную переменную експортируем
export default connect(mapStateToProps, {
  login,
})(Login);
