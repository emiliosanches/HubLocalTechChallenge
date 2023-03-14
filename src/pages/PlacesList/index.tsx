import { ArrowBackRounded, Delete, Edit, Place } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { api } from "../../services/api";
import { defaultTheme } from "../../styles/themes/defaultTheme";
import { PlaceModal } from "./components/PlaceModal";
import { DeletePlaceModal } from "./components/DeletePlaceModal";

import {
  NewPlaceButton,
  NoPlacesMessage,
  PlacesListPageContainer,
} from "./styles";

interface PlaceInList {
  id: number;
  name: string;
  companyId: number;
}

export function PlacesListPage() {
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const [places, setPlaces] = useState<PlaceInList[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [placeUpdating, setPlaceUpdating] = useState<number>();

  const [companyName, setCompanyName] = useState("");

  const [placeDeleting, setPlaceDeleting] = useState<{
    id: number;
    name: string;
    companyId: number;
  }>();

  const params = useParams();
  const navigate = useNavigate();

  const companyId = Number(params.companyId);

  async function fetchPlaces(pagination: { page: number; perPage: number }) {
    try {
      setIsLoadingPlaces(true);
      const res = await api.get(`companies/${companyId}/places`, {
        params: pagination,
      });
      setPlaces(res.data.data);
      setPage(res.data.page);
      setPerPage(res.data.perPage);
      setTotal(res.data.total);
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error("Essa empresa não pertence ao seu usuário");
        navigate("/companies");
      } else {
        toast.error("Ocorreu um erro ao listar os locais");
      }
    } finally {
      setIsLoadingPlaces(false);
    }
  }

  useEffect(() => {
    fetchPlaces({ page, perPage });
  }, [page, perPage]);

  function handleClosePlaceModal(mustReload?: boolean) {
    setIsPlaceModalOpen(false);
    setPlaceUpdating(undefined);

    if (mustReload) {
      fetchPlaces({ page: 1, perPage });
    }
  }

  function openUpdatePlaceModal(id: number) {
    setPlaceUpdating(id);
    setIsPlaceModalOpen(true);
  }

  function handleCloseDeletePlaceModal(mustReload?: boolean) {
    setPlaceDeleting(undefined);

    if (mustReload) fetchPlaces({ page, perPage });
  }

  useEffect(() => {
    api.get(`/companies/${companyId}`).then((res) => {
      setCompanyName(res.data.name);
    });
  }, []);

  return (
    <>
      <Header title={companyName} clickableTitle />
      <PlacesListPageContainer>
        {isLoadingPlaces ? (
          <ClipLoader size="4rem" id="loader" color="#a5a5a5" />
        ) : places.length ? (
          <>
            <Link to="companies">
              <ArrowBackRounded />
              Minhas Empresas
            </Link>
            <NewPlaceButton
              size="default"
              style={{ marginBottom: "1.5rem", alignSelf: "flex-end" }}
              onClick={() => setIsPlaceModalOpen(true)}
            >
              Adicionar Local
            </NewPlaceButton>
            <Table
              columns={[{ field: "name", displayName: "Local" }]}
              rows={places}
              onChangePage={(page) => setPage(page + 1)}
              onChangePerPage={(perPage) => setPerPage(perPage)}
              pagination={{ page, perPage, total }}
              actions={[
                {
                  icon: <Edit />,
                  title: "Editar",
                  onClick: openUpdatePlaceModal,
                },
                {
                  icon: <Delete htmlColor={defaultTheme.red} />,
                  title: "Excluir",
                  onClick: (id: number) =>
                    setPlaceDeleting(places.find((c) => c.id === id)),
                },
              ]}
            />
          </>
        ) : (
          <>
            <NoPlacesMessage>
              Nenhum local
              <br />
              cadastrado!
            </NoPlacesMessage>
            <NewPlaceButton
              size="big"
              onClick={() => setIsPlaceModalOpen(true)}
            >
              Adicionar Local
            </NewPlaceButton>
          </>
        )}
      </PlacesListPageContainer>
      <PlaceModal
        open={isPlaceModalOpen}
        onClose={handleClosePlaceModal}
        companyId={companyId!}
        placeId={placeUpdating}
      />
      <DeletePlaceModal
        open={!!placeDeleting}
        onClose={handleCloseDeletePlaceModal}
        companyId={placeDeleting?.companyId}
        placeName={placeDeleting?.name}
        placeId={placeDeleting?.id}
      />
    </>
  );
}
