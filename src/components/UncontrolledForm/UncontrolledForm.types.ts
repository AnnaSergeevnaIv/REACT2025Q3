export interface TextFields {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type InputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

export type InputTypeMap = { [K in keyof TextFields]: InputType };
