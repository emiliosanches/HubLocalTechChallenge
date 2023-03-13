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
import InputMask from "react-input-mask";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { cnpj } from "cpf-cnpj-validator";
import { Input } from "../../../../components/Input";
import { api } from "../../../../services/api";
import { toastFormErrors } from "../../../../utils/form/toastFormErrors";

import { CompanyForm, StyledDialog, SubmitButton } from "./styles";

interface CompanyModalProps {
  open: boolean;
  onClose: (mustReload?: boolean) => void;
  /** Provide company data if updating */
  companyId?: number;
}

const companyFormSchema = z.object({
  name: z.string().min(1, "Nome da empresa não pode ser vazio"),
  website: z.string().url("Informe um website válido"),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "Informe o CNPJ")
    .refine((v) => cnpj.isValid(v), "O CNPJ é inválido"),
});

type CompanyFormData = z.infer<typeof companyFormSchema>;

export function CompanyModal({ open, onClose, companyId }: CompanyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
  });

  const [originalCompanyName, setOriginalCompanyName] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  async function handleCreateCompany(data: CompanyFormData) {
    try {
      if (companyId) {
        await api.patch(`/companies/${companyId}`, {
          name: data.name,
          cnpj: data.cnpj,
          website: data.website,
        });
      } else {
        await api.post("/companies", {
          name: data.name,
          cnpj: data.cnpj,
          website: data.website,
        });
      }

      onClose(true);
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("Já existe uma empresa cadastrada com esse CNPJ.");
      } else {
        toast.error(
          "Ocorreu um erro ao cadastrar a empresa. Tente novamente mais tarde."
        );
      }
    }
  }

  function maskCNPJ(cnpj: string) {
    return (
      cnpj.slice(0, 2) +
      "." +
      cnpj.slice(2, 5) +
      "." +
      cnpj.slice(5, 8) +
      "/" +
      cnpj.slice(8, 12) +
      "-" +
      cnpj.slice(12)
    );
  }

  function handleSubmitError() {
    toastFormErrors(errors);
  }

  useEffect(() => {
    reset();
  }, [open]);

  useEffect(() => {
    if (companyId) {
      setIsLoadingData(true);
      api
        .get(`/companies/${companyId}`)
        .then((res) => {
          setValue("name", res.data.name);
          setValue("website", res.data.website);
          setValue("cnpj", maskCNPJ(res.data.cnpj));
          setOriginalCompanyName(res.data.name);
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao carregar os dados da empresa");
          onClose();
        })
        .finally(() => {
          setIsLoadingData(false);
        });
    }
  }, [companyId]);

  return (
    <StyledDialog onClose={() => onClose()} open={open}>
      <DialogTitle>
        {companyId ? `Editar: ${originalCompanyName}` : "Adicionar empresa"}
        <IconButton aria-label="close" onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers={true}>
        {isLoadingData ? (
          <ClipLoader id="company-form-loading" />
        ) : (
          <CompanyForm
            id="company-form"
            onSubmit={handleSubmit(handleCreateCompany, handleSubmitError)}
          >
            <Input
              labelText="Nome"
              {...register("name")}
              containerProps={{
                className: "fill-line",
              }}
            />

            <Input labelText="Website" {...register("website")} />

            <Input
              labelText="CNPJ"
              inputComponent={(props) => (
                <InputMask
                  mask="99.999.999/9999-99"
                  {...props}
                  {...register("cnpj")}
                />
              )}
            />
          </CompanyForm>
        )}
      </DialogContent>

      <DialogActions>
        <SubmitButton disabled={isSubmitting} type="submit" form="company-form">
          {isSubmitting ? (
            <ClipLoader size="1.25rem" color="white" />
          ) : companyId ? (
            "Salvar"
          ) : (
            "Adicionar"
          )}
        </SubmitButton>
      </DialogActions>
    </StyledDialog>
  );
}
