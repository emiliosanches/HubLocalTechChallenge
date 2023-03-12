import { useParams } from "react-router";

export function PlacesListPage() {
  const { companyId } = useParams();

  return <h1>Company {companyId} places list</h1>;
}
