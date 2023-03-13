import { Delete, Edit, Place } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { api } from "../../services/api";
import { defaultTheme } from "../../styles/themes/defaultTheme";

import {
  CompaniesListPageContainer,
  NewCompanyButton,
  NoCompaniesMessage,
} from "./styles";

interface CompanyInList {
  id: number;
  name: string;
  placesAmount: number;
}

export function CompaniesListPage() {
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
  const [companies, setCompanies] = useState<CompanyInList[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  async function fetchCompanies(pagination: { page: number; perPage: number }) {
    try {
      const res = await api.get("companies", {
        params: pagination,
      });
      setCompanies(res.data.data);
      setPage(res.data.page);
      setPerPage(res.data.perPage);
      setTotal(res.data.total);
    } catch (error) {
      toast.error("Ocorreu um erro ao listar as empresas");
    } finally {
      setIsLoadingCompanies(false);
    }
  }

  useEffect(() => {
    fetchCompanies({ page, perPage });
  }, [page, perPage]);

  return (
    <>
      <Header title="Minhas Empresas" />
      <CompaniesListPageContainer>
        {isLoadingCompanies ? (
          <></>
        ) : companies.length ? (
          <>
            <NewCompanyButton
              size="default"
              style={{ marginBottom: "1.5rem", alignSelf: "flex-end" }}
            >
              Adicionar Empresa
            </NewCompanyButton>
            <Table
              columns={[
                { field: "name", displayName: "Empresa" },
                { field: "placesAmount", displayName: "Qt de Locais" },
              ]}
              rows={companies}
              onChangePage={(page) => setPage(page + 1)}
              onChangePerPage={(perPage) => setPerPage(perPage)}
              pagination={{ page, perPage, total }}
              actions={[
                {
                  icon: <Edit />,
                  title: "Editar",
                  onClick: (id: number) => console.log("Clicked edit " + id),
                },
                {
                  icon: <Place />,
                  title: "Ver locais",
                  onClick: (id: number) => navigate(`/companies/${id}/places`),
                },
                {
                  icon: <Delete htmlColor={defaultTheme.red} />,
                  title: "Excluir",
                  onClick: (id: number) => console.log("Clicked delete " + id),
                },
              ]}
            />
          </>
        ) : (
          <>
            <NoCompaniesMessage>
              Nenhuma empresa
              <br />
              cadastrada!
            </NoCompaniesMessage>
            <NewCompanyButton size="big">Adicionar Empresa</NewCompanyButton>
          </>
        )}
      </CompaniesListPageContainer>
    </>
  );
}
