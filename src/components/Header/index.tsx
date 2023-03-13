import { Business, ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UserProfilePicture from "../../assets/UserProfilePicture.png";
import { StoreType } from "../../store";

import { HeaderContainer, PageInfo, UserInfo } from "./styles";

interface HeaderProps {
  title: string;
  darkTitleBackground?: boolean;
}

export function Header({ title, darkTitleBackground }: HeaderProps) {
  const { user } = useSelector((state: StoreType) => state.auth);

  return (
    <HeaderContainer>
      <PageInfo darkBackground={darkTitleBackground}>
        <Business fontSize="inherit" />
        <span>{title}</span>
      </PageInfo>
      <UserInfo>
        <img src={UserProfilePicture} />
        <span>{user?.name.split(" ")[0]}</span>
        <ExpandMore fontSize="inherit" />
      </UserInfo>
    </HeaderContainer>
  );
}
