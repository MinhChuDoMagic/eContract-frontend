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
} from "@mui/material";
import color from "../../constants/color";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaRegClosedCaptioning, FaEye, FaFileSignature } from "react-icons/fa";

export const CreateSignInfo = () => {


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
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
            //   value="Need to Sign"
              sx={{display:  "flex", flexDirection:"row"}}
            >
              <MenuItem  value="Need to Sign" >
                <ListItemIcon>
                  <FaFileSignature />
                </ListItemIcon>
                <ListItemText>Need to Sign</ListItemText>
              </MenuItem>
              <MenuItem value="Receives a Copy">
                <ListItemIcon>
                  <FaRegClosedCaptioning />
                </ListItemIcon>
                <ListItemText>Receives a Copy</ListItemText>
              </MenuItem>
              <MenuItem  value="Needs to View">
                <ListItemIcon>
                  <FaEye />
                </ListItemIcon>
                <ListItemText>Needs to View</ListItemText>
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
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            sx={{ marginRight: "40px", display: "flex", flex: 1 }}
          />

          <Box sx={{ display: "flex", flex: 1 }} />
        </Box>
      </Box>

      <Tooltip title="Delete">
        <IconButton
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
