import { Logout } from "@mui/icons-material";
import { ListItemIcon, MenuItem, Menu as MuiMenu } from "@mui/material";

import { removeCookie } from "../../utils";
import { useLogoutUser } from "../../services";
import { useAuth } from "../../Auth";

export const Menu = ({ anchorEl, handleClose }: any) => {
  const { setIsAuthenticated } = useAuth();

  console.log("anchorEl", anchorEl);
  const open = Boolean(anchorEl);

  const { mutate: logoutMutate } = useLogoutUser({
    onSuccess: () => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      setIsAuthenticated(false);
    },
  });

  const handleLogout = async () => {
    await logoutMutate({});
  };

  return (
    <MuiMenu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 200,
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </MuiMenu>
  );
};
