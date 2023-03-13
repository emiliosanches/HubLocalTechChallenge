import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { StoreType } from "../../store";
import { Header } from "./components/Header";

import { DefaultLayoutContainer } from "./styles";

export function DefaultLayout() {
  const { isLogged } = useSelector((state: StoreType) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth/login");
    }
  }, [isLogged]);

  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  );
}
