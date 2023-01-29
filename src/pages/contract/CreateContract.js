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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContract } from "../../redux/cotractSlice";

export const CreateContract = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const onFileChange = (files) => {
    setFile(files)
  };

  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [countNumb, setCountNumb] = useState(1)
  const [onlySigner, setOnlySigner] = useState(false);
  // const [components, setComponents] = useState([<div key={0}><CreateSignInfo userId={0} /></div>]);
  const [components, setComponents] = useState([
    { id: 0, name: "", email: "", role: 0 },
  ]);

  const handleAddButtonClick = () => {
    setCountNumb(countNumb+1)
    setComponents([
      ...components,
      { id: countNumb, name: "", email: "", role: 0 },
    ]);
  };

  const handleDeleteRecipient = (index) => {
    setComponents(components.filter((user, i) => i !== index));
  };

  const handelNext = () => {
    // console.log(file);
    // console.log(components);
    // console.log(typeof(message))

    const recipients =components.map(user => {
      const { id, ...rest } = user;
      return rest;
    });

    dispatch(setContract({file: file, recipients: recipients, message: message}))
    navigate("/add_field_contract");
  };
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
            {components.map((comp, index) => (
              <div key={comp.id}>
                <CreateSignInfo
                  userId={index}
                  userState={components}
                  setUserState={setComponents}
                  onDelete={() => handleDeleteRecipient(index)}
                />
              </div>
            ))}
            <Button
              variant="outlined"
              startIcon={<PersonAddIcon />}
              onClick={handleAddButtonClick}
            >
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
          onChange={(e)  => setMessage(e.target.value)}
        />
        <Divider sx={{ paddingTop: "60px" }} />
      </Box>

      <Box
        sx={{ paddingTop: "40px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={handelNext}
          variant="contained"
          sx={{ paddingX: "30px" }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
