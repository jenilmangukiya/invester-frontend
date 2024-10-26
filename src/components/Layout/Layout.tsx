import { Divider, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import Sidebar from "../Sidebar/Sidebar";

export const Layout = () => {
  return (
    <Stack direction={"column"}>
      <Header />
      <Divider />
      <Stack direction={"row"}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Stack>
  );
};
