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
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if(localStorage.getItem('token') === null){
          navigate("/login");
        }
        const response = await fetch(`http://localhost:8080/api/auth`, {
          method: 'GET',
          headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
          }
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const dispatch = useDispatch()
  const [user, setUser] = React.useState({name:""})
  const navigate = useNavigate()
  if(user  === null ){
    navigate("/login");
  }

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(setUser(null))
    localStorage.removeItem('token');
    navigate("/login");
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
        top:0,
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

      <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
        <Typography  variant="h6" sx={{color: "#444", marginRight:"10px"}} >
          Hi, {user.name}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<SettingsIcon />}
          endIcon={<Avatar name={user.name} round={true} size="35" />}
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

          <MenuItem onClick={handleLogout}>
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
