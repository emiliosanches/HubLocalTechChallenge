import { useLocation } from "react-router-dom";
import { Business, ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UserProfilePicture from "../../../../assets/UserProfilePicture.png";
import { StoreType } from "../../../../store";

import { HeaderContainer, PageInfo, UserInfo } from "./styles";

export function Header() {
  const location = useLocation();
  const normalizedPath = location.pathname
    .replace(/^\//, "")
    .replace(/\/$/, "");

  const { user } = useSelector((state: StoreType) => state.auth);

  return (
    <HeaderContainer>
      {normalizedPath === "companies" && (
        <PageInfo>
          <Business fontSize="inherit" />
          <span>Minhas Empresas</span>
        </PageInfo>
      )}
      {/^companies\/\d+\/places$/.test(normalizedPath) && (
        <PageInfo darkBackground>
          <Business fontSize="inherit" />
          <span>Nome da Empresa</span>
        </PageInfo>
      )}
      <UserInfo>
        <img src={UserProfilePicture} />
        <span>{user?.name.split(" ")[0]}</span>
        <ExpandMore fontSize="inherit" />
      </UserInfo>
    </HeaderContainer>
  );
}
