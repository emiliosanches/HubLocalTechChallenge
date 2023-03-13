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
    background-color: ${(props) => props.theme.red};
    font-size: 1.5rem;
    font-weight: 700;
    color: white;

    button svg {
      height: 2rem;
      width: 2rem;
      color: white;
    }
  }
`;

export const DeleteButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  background-color: ${(props) => props.theme.red};
  border-radius: 4px;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
`;
