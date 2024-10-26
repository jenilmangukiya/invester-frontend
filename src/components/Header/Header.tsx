import { PersonOutline } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu } from "../Menu";
import React from "react";
import { theme } from "../Theme/theme";
import { useAuth } from "../../Auth";

export const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  console.log("anchorEl", anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("handleclock");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("call");
    setAnchorEl(null);
  };

  return (
    <Stack p={2} direction={"row"} justifyContent={"space-between"}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Stack ml={4} direction={"row"} gap={2} alignItems={"center"}>
          <AutoAwesomeIcon sx={{ color: "primary.main", fontSize: "36px" }} />
          <Typography variant="h5" fontWeight={700} color={"text.primary"}>
            Invest.
          </Typography>
        </Stack>
      </Link>

      {isAuthenticated && (
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Box bgcolor={theme.palette.primary.main} borderRadius={"100%"}>
            <IconButton aria-label="Profile" onClick={handleClick}>
              <PersonOutline sx={{ color: "white" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} handleClose={handleClose} />
          </Box>
          <Typography variant="body1" fontWeight={600} onClick={handleClick}>
            {user.fullName}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
