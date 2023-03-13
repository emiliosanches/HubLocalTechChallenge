import {
  Paper,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { ReactNode } from "react";
import { ActionButton, StyledTableContainer } from "./styles";

interface TableColumn {
  field: string;
  displayName: string;
}

interface TableItemAction {
  icon: ReactNode;
  title: string;
  onClick: (id: number) => void;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
}

interface TableProps {
  rows: any[];
  columns: TableColumn[];
  actions?: TableItemAction[];
  pagination: Pagination;
  onChangePage: (page: number) => void;
  onChangePerPage: (perPage: number) => void;
}

export function Table({
  rows,
  columns,
  actions,
  pagination,
  onChangePage,
  onChangePerPage,
}: TableProps) {
  return (
    <StyledTableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell style={{ padding: 20 }}>
                <span>{col.displayName}</span>
              </TableCell>
            ))}
            {!!actions?.length && <TableCell>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              {columns.map((col) => (
                <TableCell>
                  <span>{row[col.field]}</span>
                </TableCell>
              ))}

              {!!actions?.length && (
                <TableCell className="actions-cell">
                  {actions.map((action) => (
                    <ActionButton onClick={() => action.onClick(row.id)}>
                      {action.icon}
                    </ActionButton>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.perPage}
          page={pagination.page - 1}
          onPageChange={(_, page) => onChangePage(page)}
          onRowsPerPageChange={(evt) =>
            onChangePerPage(Number(evt.target.value))
          }
          labelRowsPerPage="Itens por página:"
        />
      </MuiTable>
    </StyledTableContainer>
  );
}
