import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  ListItemText,
  ListItemIcon,
  Autocomplete,
} from "@mui/material";
import color from "../../constants/color";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegClosedCaptioning, FaEye, FaFileSignature } from "react-icons/fa";
import { useState } from "react";

export const CreateSignInfo = ({ userId, userState, setUserState,  onDelete }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState([]);

  const handleSuggestChange = (keyword) => {
    
    userState[userId].email = keyword;
    setUserState(userState);
    fetch(`http://localhost:8080/api/auth/search?key=${keyword}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        const labeledEmails = response.map((email) => ({ label: email }));
        
        setEmailSuggestion(labeledEmails);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNameChange = (name) => {
    userState[userId].name = name;
    setUserState(userState);
  };

  const handleRoleChange = (role) => {
    setSelectedValue(role);
    userState[userId].role = role;
    setUserState(userState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "170px",
        border: "1px solid #D9D9D9",
        marginY: "40px",
      }}
    >
      <Box
        sx={{ backgroundColor: color.lightBlue, width: "30px", height: "100%" }}
      />

      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          paddingX: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            paddingBottom: "10px",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            sx={{ marginRight: "40px" }}
            onChange={(event) => handleNameChange(event.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              value={selectedValue}
              onChange={(event) => handleRoleChange(event.target.value)}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MenuItem
                value={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <ListItemIcon>
                    <FaFileSignature />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "50%", marginLeft: "-10px" }}>
                    Need to Sign
                  </ListItemText>
                </Box>
              </MenuItem>
              <MenuItem
                value={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <ListItemIcon>
                    <FaRegClosedCaptioning />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "50%", marginLeft: "-10px" }}>
                    Receives a Copy
                  </ListItemText>
                </Box>
              </MenuItem>
              <MenuItem
                value={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <ListItemIcon>
                    <FaEye />
                  </ListItemIcon>
                  <ListItemText sx={{ width: "50%", marginLeft: "-10px" }}>
                    Needs to View
                  </ListItemText>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            paddingBottom: "10px",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ marginRight: "40px", display: "flex", flex: 1 }}
            options={emailSuggestion}
            forcePopupIcon={false}
            noOptionsText="Can not find email"
            onChange={(event, newValue) => {
              userState[userId].email = newValue.label;
              setUserState(userState);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => handleSuggestChange(e.target.value)}
              />
            )}
          />

          <Box sx={{ display: "flex", flex: 1 }} />
        </Box>
      </Box>

      <Tooltip title="Delete">
        <IconButton  onClick={onDelete}
          sx={{
            height: "100%",
            width: "60px",
            borderRadius: "0px",
            border: "3px solid #FF7F7F",
            backgroundColor: "#FF7F7F",
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
