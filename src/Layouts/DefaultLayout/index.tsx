import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { StoreType } from "../../store";

export function DefaultLayout() {
  const { isLogged } = useSelector((state: StoreType) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth/login");
    }
  }, [isLogged]);

  return (
    <div>
      <h1>Default Layout</h1>
      <Outlet />
    </div>
  );
}
