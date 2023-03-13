import styled from "styled-components";

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
