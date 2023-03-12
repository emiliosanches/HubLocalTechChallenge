import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { StoreType } from "../../store";
import HeroImage from "../../assets/HeroImage.png";

import { AuthLayoutContainer, Hero } from "./styles";

export function AuthLayout() {
  const { isLogged } = useSelector((state: StoreType) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/companies");
    }
  }, [isLogged]);

  return (
    <AuthLayoutContainer>
      <Hero>
        <img src={HeroImage} />
        <div>
          <h2>
            Junte-se a vários <br />
            clientes satisfeitos.
          </h2>
          <p>
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
          </p>
        </div>
      </Hero>
      <section>
        <Outlet />
      </section>
    </AuthLayoutContainer>
  );
}
