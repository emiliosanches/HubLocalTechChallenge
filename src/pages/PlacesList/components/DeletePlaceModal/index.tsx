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

interface PlaceModalProps {
  open: boolean;
  onClose: (mustReload?: boolean) => void;
  companyId?: number;
  placeName?: string;
  placeId?: number;
}

export function DeletePlaceModal({
  open,
  onClose,
  companyId,
  placeName,
  placeId
}: PlaceModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleDeletePlace() {
    setIsDeleting(true);
    api
      .delete(`companies/${companyId}/places/${placeId}`)
      .then(() => {
        onClose(true);
      })
      .catch(() => {
        toast.error("Ocorreu um erro ao excluir o local");
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
        O local&nbsp;<b>{placeName}</b>&nbsp;será excluído. Tem certeza
        dessa ação?
      </DialogContent>

      <DialogActions>
        <DeleteButton disabled={isDeleting} onClick={handleDeletePlace}>
          {isDeleting ? <ClipLoader size="1.25rem" color="white" /> : "Excluir"}
        </DeleteButton>
      </DialogActions>
    </StyledDialog>
  );
}
