import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import WebViewer from "@pdftron/webviewer";
import SendIcon from "@mui/icons-material/Send";

export const SignField = () => {
  const [recipient, setRecipient] = useState("");

  const handleChange = (event) => {};

  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "webviewer",
        disabledElements: [
          "ribbons",
          "toggleNotesButton",
          "searchButton",
          "menuButton",
        ],
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer } = instance.Core;
      // you can now call WebViewer APIs here...
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "primary.dark",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "280px",
          backgroundColor: "#fff",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ paddingX: "10px", paddingTop: "20px" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Prepare Document
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Adding signature for
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Recipient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recipient}
              label="Recipient"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            endIcon={<DriveFileRenameOutlineIcon />}
            fullWidth
          >
            Add signature
          </Button>
        </Box>

        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          sx={{ borderRadius: "0px" }}
          fullWidth
        >
          Send
        </Button>
      </Box>

        <div style={{display: "flex", flex: "1"}} className="webviewer" ref={viewer}></div>
    </Box>
  );
};
