import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { register, actions } from "../../redux/actions/auth";
import { Redirect } from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css";

const RegisterForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="login"
          placeholder="Login"
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          name="email"
          placeholder="Email"
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
          type="password"
          name="password"
          placeholder="Password"
          validate={[required]}
          component={Input}
        />
      </div>
      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Register</button>
      </div>
    </form>
  );
};

const RegisterReduxForm = reduxForm({
  form: "register",
})(RegisterForm);

const Register = (props) => {
  const onSubmit = (formData) => {
    const { email, login, password } = formData;
    props.register(email, login, password);
  };

  if (props.isRegister) {
    props.setIsRegister();
    return <Redirect to={"/login"} />;
  }

  return (
    <div>
      <h1>Register</h1>
      <RegisterReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isRegister: state.authReducer.isRegister,
  };
};

export default connect(mapStateToProps, {
  ...actions,
  register,
})(Register);
