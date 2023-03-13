import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { StoreType } from "../../store";

export function PageGuard() {
  const navigate = useNavigate();

  const { isLogged } = useSelector((state: StoreType) => state.auth);

  if (!isLogged) navigate("/auth/login");

  return <Outlet />;
}
