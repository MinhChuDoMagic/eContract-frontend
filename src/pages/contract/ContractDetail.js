import { Box, Typography, Button, Divider } from "@mui/material";
import color from "../../constants/color";
import ErrorIcon from "@mui/icons-material/Error";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { setSign } from "../../redux/signSlice";
import { setRead } from "../../redux/readSlice";

export async function loader({ params }) {
  return params.contractId;
}

export const ContractDetail = () => {
  let contractId = useLoaderData();
  // const dataIntital = {
  //   id: "",
  //   name: "",
  //   sender: "",
  //   lastChange: "",
  //   sentOn: "",
  //   state: 2,
  //   recipients: [
  //     {
  //       name: "",
  //       email: "",
  //       signed: 0,
  //       signedOn: "",
  //     },
  //   ],
  //   message: "",
  // };

  const [data, setData] = useState(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/contract?id=${contractId}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleButton = async () => {
    if (data.state === 0) {
      const response = await fetch(`http://localhost:8080/api/auth`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      dispatch(setSign({ id: data.id, email: json.email }));
      navigate("/sign");
    } else {
      dispatch(setRead(data.id));
      navigate("/read");
    }
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
        paddingBottom: "50px",
        border: "1px solid #CCE7FC",
        minHeight: "calc(100vh - 130px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {data !== null && (
        <>
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
            <Typography
              color="action"
              sx={{ marginTop: "-8px", color: "#666666" }}
            >
              Last change on {data.lastChange}
            </Typography>
            <Typography
              color="action"
              sx={{ marginTop: "-8px", color: "#666666" }}
            >
              Sent on {data.sentOn}
            </Typography>

            <ContractState state={data.state} />

            <Button
              sx={{ width: "200px", marginTop: "5px", marginBottom: "25px" }}
              variant="outlined"
              onClick={handleButton}
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
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "30px" }}
            >
              Message
            </Typography>

            {data.message === "" ? (
              <Typography sx={{ color: "#666666" }}>
                No message has been entered.
              </Typography>
            ) : (
              <Typography>{data.message}</Typography>
            )}
          </Box>
        </>
      )}
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
          {state.signed === 0 ? "Completed" : "Need to action"}
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
