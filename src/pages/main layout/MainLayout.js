import { Stack, Box, colors } from "@mui/material";
import { Outlet } from "react-router-dom";
import color from "../../constants/color";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export const MainLayout = () => {
  return (
    <Box>
      <Header />
      <SideBar />
        <Box
          flex={1}
          sx={{
            backgroundColor: color.mainBlue,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginX: 3,
            paddingX: 2.5,
            paddingY: 2.5,
            marginLeft: "260px",
            marginTop: "90px"
          }}
        >
          <Outlet />
        </Box>
    </Box>
  );
};
