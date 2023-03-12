import styled from "styled-components";

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 7.5rem;
  height: 100%;
  width: 100%;

  img {
    margin-bottom: 2rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
  }

  input {
    width: 100%;
    height: 3.75rem;
    border: 1px solid ${(props) => props.theme.blue};
    border-radius: 4px;
    background: transparent;
    padding: 0 1.375rem;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 1.25rem;
  font-size: 1.25rem;
  line-height: 100%;
  font-weight: 700;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

export const SignUpButton = styled(Button).attrs({
  type: "submit",
})`
  background-color: ${(props) => props.theme.blue};
  margin-top: 0.75rem;
`;

export const NavigateToLoginButton = styled(Button)`
  background-color: ${(props) => props.theme.green};
  margin-top: 1rem;
`;
