import { Box, Typography, Button, Divider } from "@mui/material";
import color from "../../constants/color";
import ErrorIcon from "@mui/icons-material/Error";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export const ContractDetail = () => {
  const data = {
    id: "12345465",
    name: "Template.pdf",
    sender: "Chu Minh",
    lastChange: "1/5/2023 | 03:59:31 pm",
    sentOn: "1/5/2023 | 03:51:42 pm",
    state: 2,
    recipients: [
      {
        name: "Chu Minh",
        email: "chunhatminh01@gmail.com",
        signed: 0,
        signedOn: "1/5/2023 | 03:51:42",
      },
      {
        name: "Chu Minh",
        email: "chunhatminh01@gmail.com",
        signed: 0,
        signedOn: "1/5/2023 | 03:51:42",
      },
    ],
    message: "Hiiii",
  };

  return (
    <Box
      sx={{
        bgcolor: color.White,
        borderRadius: "10px",
        borderColor: color.borderLightBlue,
        width: "100%",
        paddingX: "15px",
        paddingY: "30px",
        paddingBottom:"50px",
        border: "1px solid #CCE7FC",
        minHeight: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ paddingX: "15px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Complete with eContract: {data.name}
        </Typography>

        <Typography
          color="primary"
          sx={{ marginTop: "8px", fontWeight: "bold" }}
        >
          Contract ID: {data.id}
        </Typography>
        <Typography color="primary" sx={{ marginTop: "-8px" }}>
          From: {data.sender}
        </Typography>
        <Typography color="action" sx={{ marginTop: "-8px", color: "#666666" }}>
          Last change on {data.lastChange}
        </Typography>
        <Typography color="action" sx={{ marginTop: "-8px", color: "#666666" }}>
          Sent on {data.sentOn}
        </Typography>

        <ContractState state={data.state} />

        <Button
          sx={{ width: "200px", marginTop: "5px", marginBottom: "25px" }}
          variant="outlined"
        >
          Read Contract
        </Button>
      </Box>

      <Divider />

      <Box sx={{ paddingX: "15px", marginTop: "30px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Recipients
        </Typography>

        {data.recipients.map((recipient, index) => (
          <Recipient key={index} state={recipient} index={index} />
        ))}
      </Box>

      <Box sx={{ paddingX: "15px", marginTop: "50px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom:"30px" }}>
          Message
        </Typography>

        {data.message === "" ? (
          <Typography sx={{ color: "#666666" }}>
            No message has been entered.
          </Typography>
        ) : (
          <Typography>
            {data.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const ContractState = ({ state }) => (
  <Box sx={{ marginTop: "5px" }}>
    {state === 0 && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginLeft: "-1px",
        }}
      >
        <ErrorIcon color="action" />
        <Typography sx={{ fontWeight: "bold", marginLeft: "5px" }}>
          Action Required
        </Typography>
      </Box>
    )}
    {state === 1 && (
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "-1px" }}>
        <QueryBuilderIcon color="action" />
        <Typography sx={{ fontWeight: "bold", marginLeft: "5px" }}>
          Waiting for Others
        </Typography>
      </Box>
    )}
    {state === 2 && (
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "-1px" }}>
        <CheckIcon color="success" />
        <Typography sx={{ fontWeight: "bold", marginLeft: "5px" }}>
          Completed
        </Typography>
      </Box>
    )}
  </Box>
);

const Recipient = ({ state, index }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #E0E0E0",
      alignItems: "center",
      paddingBottom: "15px",
      paddingTop: "20px",
    }}
  >
    <Typography color="action" sx={{ fontWeight: "Bold", color: "#666666" }}>
      {index + 1}
    </Typography>

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 3,
        marginLeft: "20px",
      }}
    >
      <IconState state={state.signed} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginLeft: "10px",
        }}
      >
        <Typography sx={{ fontWeight: "Bold", marginBottom: "0px" }}>
          {state.name}
        </Typography>
        <Typography sx={{ color: "#666666" }}>{state.email}</Typography>
      </Box>
    </Box>

    <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
      <DriveFileRenameOutlineIcon color="action" />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontWeight: "Bold" }}>
          {state.signed === 0 ? "Signed" : "Need to sign"}
        </Typography>
        <Typography sx={{ color: "#666666" }}>on {state.signedOn}</Typography>
      </Box>
    </Box>
  </Box>
);

const IconState = ({ state }) => (
  <>
    {state === 1 && <QueryBuilderIcon color="action" />}
    {state === 0 && <CheckIcon color="success" />}
  </>
);
