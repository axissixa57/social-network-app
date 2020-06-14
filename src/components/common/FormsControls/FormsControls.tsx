import React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import { WrappedFieldMetaProps } from "redux-form/lib/Field";
import styles from "./FormsControls.module.css";
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

// в props приходят {input, meta, placeholder, col, row, ...}
// с помощью деструктуризации мы вырезаем часть из пропсов { input, meta, ...props}
// и в props уже останется {placeholder, col, row, ...}
// children - это всё то что содержится внутри тега
// meta: {touched, error} - внутренняя деструктуризация
const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  // touched, если фокус попал в textarea, meta.error приходит из ф-ции(возращаемое значение), кот. мы создали в validators
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const {
    input,
    meta,
    ...restProps
  } = props; /*в пропсах сидят лишние значения, а нам нужны только кот. приходят в input*/
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

/*заменяем input на Field из redux-form, все атрибуты пойдут в input, необходимо для отображения в store.state.form, благодаря атрибуту name, значени появятся в store.state.form*/
export function createField<FormKeysType extends string>( // FormKeysType - generic type, при вызове ф-ции createField передаём конкретный тип; extends string - задаёт ограничение, что только строки
  name: FormKeysType, // нужен чтобы чётко определить какие строки нужны - keyof {login: string, password: string, ...} = "login" | "password"
  placeholder: string | undefined,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        name={name}
        placeholder={placeholder}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
