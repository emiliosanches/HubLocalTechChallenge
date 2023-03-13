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

  :disabled {
    opacity: 0.7;
  }
`;

export const NavigateToLoginButton = styled(Button)`
  background-color: ${(props) => props.theme.green};
  margin-top: 1rem;
`;
