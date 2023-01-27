import {
  Box,
  Button,
  Typography,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import color from "../../constants/color";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "react-avatar";
import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90px",
        backgroundColor: "#fff",
        paddingLeft: "20px",
        paddingRight: "25px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        zIndex: 1000
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <img src={logo} alt="logo" width="30" height="30" />
        <Typography
          variant="h5"
          sx={{
            paddingLeft: "10px",
            color: color.blackText,
            fontWeight: "bold",
          }}
        >
          eContract
        </Typography>
      </Box>

      <Box>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          endIcon={<Avatar name="Minh Chu" round={true} size="35" />}
          sx={{ borderRadius: "30px" }}
          onClick={handleOpenUserMenu}
        />

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 4,
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
