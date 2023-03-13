import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { InputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  inputComponent?: (
    props?: InputHTMLAttributes<HTMLInputElement> &
      React.RefAttributes<HTMLInputElement>
  ) => ReactElement;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Input = forwardRef(
  (
    { labelText, inputComponent, containerProps, ...inputProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputContainer
        {...(containerProps ?? {})}
        className={`InputContainer ${containerProps?.className ?? ""}`}
      >
        <label>{labelText}</label>
        {inputComponent ? (
          inputComponent({
            ...inputProps,
            ref,
          })
        ) : (
          <input {...inputProps} ref={ref} />
        )}
      </InputContainer>
    );
  }
);
