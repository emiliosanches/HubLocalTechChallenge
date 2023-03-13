import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import { toastFormErrors } from "../../../../utils/form/toastFormErrors";

import { PlaceForm, StyledDialog, SubmitButton } from "./styles";

interface PlaceModalProps {
  open: boolean;
  onClose: (mustReload?: boolean) => void;

  /** Provide if updating */
  companyId: number;
  /** Provide if updating */
  placeId?: number;
}

const placeFormSchema = z.object({
  name: z.string().min(1, "Informe o nome do local"),
  cep: z.string().regex(/^\d{5}\-\d{3}$/),
  street: z.string().min(1, "Informe a rua"),
  number: z.string().min(1, "Informe o número"),
  neighborhood: z.string().min(1, "Informe o bairro"),
  city: z.string().min(1, "Informe a cidade"),
  state: z.string().min(1, "Informe o estado"),
});

type PlaceFormData = z.infer<typeof placeFormSchema>;

export function PlaceModal({
  open,
  onClose,
  companyId,
  placeId,
}: PlaceModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeFormSchema),
  });

  const [originalPlaceName, setOriginalPlaceName] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  async function handleCreatePlace(data: PlaceFormData) {
    try {
      if (placeId) {
        await api.patch(`/companies/${companyId}/places/${placeId}`, {
          name: data.name,
          zipcode: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });
      } else {
        await api.post(`/companies/${companyId}/places`, {
          name: data.name,
          zipcode: data.cep,
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });
      }

      onClose(true);
    } catch (error: any) {
      toast.error(
        "Ocorreu um erro ao cadastrar o local. Tente novamente mais tarde."
      );
    }
  }

  function handleSubmitError() {
    toastFormErrors(errors);
  }

  useEffect(() => {
    if (!open) {
      reset();
      setOriginalPlaceName("");
      setIsLoadingData(false);
    }
  }, [open]);

  useEffect(() => {
    if (placeId) {
      setIsLoadingData(true);
      api
        .get(`/companies/${companyId}/places/${placeId}`)
        .then((res) => {
          setOriginalPlaceName(res.data.name);
          setValue("name", res.data.name);
          setValue("cep", res.data.zipcode);
          setValue("street", res.data.street);
          setValue("number", res.data.number);
          setValue("neighborhood", res.data.neighborhood);
          setValue("city", res.data.city);
          setValue("state", res.data.state);
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao carregar os dados da empresa");
          onClose();
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    }
  }, [placeId]);

  return (
    <StyledDialog onClose={() => onClose()} open={open}>
      <DialogTitle>
        {placeId ? `Editar: ${originalPlaceName}` : "Adicionar empresa"}
        <IconButton aria-label="close" onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers={true}>
        {isLoadingData ? (
          <ClipLoader id="place-form-loading" />
        ) : (
          <PlaceForm
            id="place-form"
            onSubmit={handleSubmit(handleCreatePlace, handleSubmitError)}
          >
            <Input
              labelText="Nome"
              {...register("name")}
              containerProps={{
                className: "fill-line",
              }}
            />

            <Input labelText="CEP" {...register("cep")} />
            <Input labelText="Rua" {...register("street")} />
            <Input labelText="Número" {...register("number")} />
            <Input labelText="Bairro" {...register("neighborhood")} />
            <Input labelText="Cidade" {...register("city")} />
            <Input labelText="Estado" {...register("state")} />
          </PlaceForm>
        )}
      </DialogContent>

      <DialogActions>
        <SubmitButton disabled={isSubmitting} type="submit" form="place-form">
          {isSubmitting ? (
            <ClipLoader size="1.25rem" color="white" />
          ) : placeId ? (
            "Salvar"
          ) : (
            "Adicionar"
          )}
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
}
