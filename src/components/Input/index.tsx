import { ForwardedRef, forwardRef } from "react";
import { RefCallBack } from "react-hook-form/dist/types/form";
import { InputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

export const Input = forwardRef(
  (
    { labelText, ...inputProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputContainer>
        <label>{labelText}</label>
        <input {...inputProps} ref={ref} />
      </InputContainer>
    );
  }
);
