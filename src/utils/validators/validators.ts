export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => {
    if(value) return undefined;
    return 'Field is required';
};

// thunk, через замыкание получит доступ к maxLength, эту ф-цию вызовет redux-form
export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if(value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
};