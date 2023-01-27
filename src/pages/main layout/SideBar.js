import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { FaSignature } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      sx={{
        width: "260px",
        height: "100%",
        backgroundColor: "#ffffff",
        position: "fixed",
      }}
    >
      <List
        sx={{
          maxWidth: "100%",
          paddingX: "10px",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <>
          <ListSubheader>General</ListSubheader>
          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="home"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </>

        <>
          <ListSubheader>CONTRACT</ListSubheader>
          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="contract/create"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create contract" />
          </ListItemButton>
        </>

        <>
          <ListSubheader>ENVELOPES</ListSubheader>
          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="inbox"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>

          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="sent"
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </>

        <>
          <ListSubheader>QUICK VIEWS</ListSubheader>
          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="action_required"
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText primary="Action required" />
          </ListItemButton>

          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="waiting"
            selected={selectedIndex === 5}
            onClick={(event) => handleListItemClick(event, 5)}
          >
            <ListItemIcon>
              <QueryBuilderIcon />
            </ListItemIcon>
            <ListItemText primary="Waiting for Others" />
          </ListItemButton>

          <ListItemButton
            sx={{ borderRadius: "10px" }}
            component={Link}
            to="completed"
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Completed" />
          </ListItemButton>
        </>
      </List>
    </Box>
  );
};
