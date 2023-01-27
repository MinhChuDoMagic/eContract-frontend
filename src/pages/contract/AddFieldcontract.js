import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SendIcon from '@mui/icons-material/Send';
import WebViewer from '@pdftron/webviewer'

export const AddFieldContract = () => {
  const [user, setUser] = useState("");
  const viewer = useRef(null);

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    WebViewer(
        {
            path: 'webviewer',
            disabledElements: [
              'ribbons',
              'toggleNotesButton',
              'searchButton',
              'menuButton',
            ],
          },
      viewer.current,
    ).then((instance) => {
        const { documentViewer } = instance.Core;
        // you can now call WebViewer APIs here...
      });
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        bgcolor: "#909",
      }}
    >
      <Box sx={{display:'flex', flexDirection: "column", height: "100%", width: "260px", bgcolor: "#fff", justifyContent:"space-between" }}>
        <Box sx={{paddingX:"10px", paddingTop:"10px"}}>
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
              value={user}
              label="Recipient"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" endIcon={<DriveFileRenameOutlineIcon/> } sx={{marginTop:"10px"}}>Add signature</Button>
        </Box>

        <Button variant="outlined" sx={{borderRadius:0}} fullWidth endIcon={<SendIcon/>}>Send</Button>

      </Box>

      <Box flex={1} ref={viewer}>

      </Box>
    </Box>
  );
};
