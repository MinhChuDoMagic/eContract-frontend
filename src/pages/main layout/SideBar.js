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

export const SideBar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        width: "260px",
        height: "100%",
        backgroundColor: "#ffffff",
        position: "fixed",
        paddingTop: "90px",
        top: "0",
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
          <ListSubheader>CONTRACT</ListSubheader>
          <ListItemButton sx={{ borderRadius: "10px" }}>
            <ListItemIcon>
              <NoteAddIcon />
            </ListItemIcon>
            <ListItemText primary="Create contract" />
          </ListItemButton>
        </>

        <>
          <ListSubheader>ENVELOPES</ListSubheader>
          <ListItemButton sx={{ borderRadius: "10px" }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: "10px" }}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent" />
          </ListItemButton>
        </>

        <>
          <ListSubheader>QUICK VIEWS</ListSubheader>
          <ListItemButton sx={{ borderRadius: "10px" }}>
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText primary="Action required" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: "10px" }}>
            <ListItemIcon>
              <QueryBuilderIcon />
            </ListItemIcon>
            <ListItemText primary="Waiting for Others" />
          </ListItemButton>

          <ListItemButton sx={{ borderRadius: "10px" }}>
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
