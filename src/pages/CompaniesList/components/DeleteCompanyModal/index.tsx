import { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { api } from "../../../../services/api";

import { StyledDialog, DeleteButton } from "./styles";
import { toast } from "react-toastify";

interface CompanyModalProps {
  open: boolean;
  onClose: (mustReload?: boolean) => void;
  companyId?: number;
  companyName?: string;
}

export function DeleteCompanyModal({
  open,
  onClose,
  companyId,
  companyName,
}: CompanyModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeleteCompany() {
    setIsDeleting(true);
    api
      .delete(`companies/${companyId}`)
      .then(() => {
        onClose(true);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao excluir a empresa");
        onClose();
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <StyledDialog onClose={() => onClose()} open={open}>
      <DialogTitle>
        Confirmação de exclusão
        <IconButton aria-label="close" onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers={true}>
        A empresa&nbsp;<b>{companyName}</b>&nbsp;será excluída. Tem certeza
        dessa ação?
      </DialogContent>

      <DialogActions>
        <DeleteButton disabled={isDeleting} onClick={handleDeleteCompany}>
          {isDeleting ? <ClipLoader size="1.25rem" color="white" /> : "Excluir"}
        </DeleteButton>
      </DialogActions>
    </StyledDialog>
  );
}
