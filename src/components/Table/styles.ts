import { TableContainer } from "@mui/material";
import { ElementType } from "react";
import styled from "styled-components";

export const ActionButton = styled.button`
  background: transparent;
  border: none;
`;

export const StyledTableContainer = styled(TableContainer)<{
  component: ElementType;
}>`
  .MuiTable-root {
    min-width: 650px;

    .MuiTableHead-root {
      .MuiTableRow-root {
        .MuiTableCell-root {
          font-size: 1.125rem;
          font-weight: 600;

          &:first-child > span {
            margin-left: 1.25rem;
          }
        }
      }
    }

    .MuiTableBody-root {
      .MuiTableCell-root {
        font-size: 1rem;

        &:first-child > span {
          margin-left: 1.5rem;
        }

        &.actions-cell {
          display: flex;
          gap: 0.875rem;
        }
      }
    }
  }
`;
