import styled from "styled-components";
import { Dialog } from "@mui/material";

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    width: 42.75rem;
    max-width: none;
    border-radius: 10px;
  }

  & .MuiDialogTitle-root {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem 2rem;
    background-color: ${(props) => props.theme.blue};
    font-size: 1.5rem;
    font-weight: 700;
    color: white;

    button svg {
      height: 2rem;
      width: 2rem;
      color: white;
    }
  }

  & .MuiDialogContent-root {
    display: flex;
    justify-content: center;
  }

  #place-form-loading {
    align-self: center;
  }
`;

export const PlaceForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 2.25rem;
  height: fit-content;

  .InputContainer {
    margin-bottom: 0.5rem;
  }

  .fill-line {
    width: 100%;
  }

  & > div:not(.fill-line) {
    width: calc(50% - 1.125rem);
  }

  input {
    height: 2.75rem;
    font-size: 1.125rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  background: ${(props) => props.theme.blue};
  border-radius: 4px;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
`;
