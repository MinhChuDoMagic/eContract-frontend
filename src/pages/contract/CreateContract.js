import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { CreateSignInfo } from "../../components/create sign info/createSignInfo";
import DropFileInput from "../../components/drag drop file/DropFileInput";
import color from "../../constants/color";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const CreateContract = () => {
  const onFileChange = (files) => {
    console.log(files);
  };

  const [onlySigner, setOnlySigner] = useState(false);
  const [components, setComponents] = useState([<div key={0}><CreateSignInfo/></div>]);

  const handleAddButtonClick = () => {
    setComponents([...components, <div key={components.length}><CreateSignInfo/></div>]);
  }
  return (
    <Box
      sx={{
        bgcolor: color.White,
        borderRadius: "10px",
        borderColor: color.borderLightBlue,
        width: "100%",
        paddingX: "30px",
        paddingY: "30px",
        border: "1px solid #CCE7FC",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: color.blackText,
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
        >
          Add documents
        </Typography>
        <DropFileInput onFileChange={(files) => onFileChange(files)} />
        <Divider sx={{ paddingTop: "60px" }} />
      </Box>

      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: color.blackText,
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          Add recipients
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={onlySigner}
              onChange={() => setOnlySigner(!onlySigner)}
            />
          }
          label="I'm the only signer"
        />

        {!onlySigner && (
          <>
            {components}
            <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={handleAddButtonClick}>
              ADD RECIPIENT
            </Button>
          </>
        )}

        <Divider sx={{ paddingTop: "60px" }} />
      </Box>

      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: color.blackText,
            paddingTop: "50px",
            paddingBottom: "20px",
          }}
        >
          Add description
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          fullWidth
          rows={8}
        />
        <Divider sx={{ paddingTop: "60px" }} />
      </Box>

      <Box
        sx={{ paddingTop: "40px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="contained" sx={{ paddingX: "30px" }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
