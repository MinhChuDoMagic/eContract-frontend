import { Container, Stack, Box, colors } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const MainLayout = () => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.blue,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
        <Header/>

      <Stack flex={1} direction="row">
        <SideBar/>
        <Box flex={1} bgcolor="blue[50]">
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};
