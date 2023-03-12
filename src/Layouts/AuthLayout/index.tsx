import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { StoreType } from "../../store";

export function AuthLayout() {
  const { isLogged } = useSelector((state: StoreType) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/companies");
    }
  }, [isLogged]);

  return (
    <div>
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  );
}
