import { useParams } from "react-router";
import { Header } from "../../components/Header";

export function PlacesListPage() {
  const { companyId } = useParams();

  return (
    <>
      <Header title="Nome da empresa" darkTitleBackground={true} />
      <h1>Company {companyId} places list</h1>
    </>
  );
}
