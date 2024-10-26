import { Box, Divider, Stack, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";
import { Home, Add } from "@mui/icons-material";
import { theme } from "../Theme/theme";

const Sidebar = () => {
  const sidebar = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      label: "Add Invester",
      href: "/addInvester",
      icon: Add,
    },
  ];
  return (
    <Box
      width={"300px"}
      sx={{
        height: "100vh",
        zIndex: 3,
        borderRight: "1px solid #80808069",
      }}
    >
      <Stack>
        {sidebar.map((item) => (
          <NavLink
            to={item.href}
            style={{ textDecoration: "none", color: "black" }}
          >
            {({ isActive }) => (
              <>
                <Stack
                  direction={"row"}
                  gap={1}
                  padding={"16px"}
                  sx={{
                    bgcolor: isActive ? theme.palette.primary.main : "",
                    color: isActive ? "white" : "",
                  }}
                >
                  <item.icon />
                  <Typography variant="body1" sx={{ textDecoration: "none" }}>
                    {item.label}
                  </Typography>
                </Stack>
                <Divider />
              </>
            )}
          </NavLink>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
