import { Business, ExpandMore } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePicture from "../../assets/UserProfilePicture.png";
import { StoreType } from "../../store";
import { logout } from "../../store/modules/auth/actions";

import { HeaderContainer, PageInfo, UserInfo } from "./styles";

interface HeaderProps {
  title: string;
  clickableTitle?: boolean; // not defined in layout, but visually seems to be a dropdown
}

export function Header({ title, clickableTitle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreType) => state.auth);

  const profileButtonRef = useRef<HTMLButtonElement>(null);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <HeaderContainer>
      <PageInfo variant={clickableTitle ? "clickable" : "default"}>
        <Business fontSize="inherit" />
        <span>{title}</span>
        {!!clickableTitle && <ExpandMore />}
      </PageInfo>

      <UserInfo
        id="profile-button"
        ref={profileButtonRef}
        onClick={() => setIsMenuOpen(() => true)}
      >
        <img src={UserProfilePicture} />
        <span>{user?.name.split(" ")[0]}</span>
        <ExpandMore fontSize="inherit" />
      </UserInfo>

      <Menu
        open={isMenuOpen}
        anchorEl={profileButtonRef.current}
        onClose={() => setIsMenuOpen(false)}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </HeaderContainer>
  );
}
