import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  LinearProgress,
} from "@mui/material";
import color from "../../constants/color";
import ErrorIcon from "@mui/icons-material/Error";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";

export const Envelope = ({ type }) => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    {
      docName: "Template",
      to: ["Chu Minh", "Minh Chu"],
      state: 0,
      signed: 1,
      needed: 2,
      timeChange: "10:13:29 am",
      dateChange: "26/1/2023",
    },

    {
      docName: "Template",
      to: ["Chu Minh", "Minh Chu"],
      state: 1,
      signed: 1,
      needed: 2,
      timeChange: "10:13:29 am",
      dateChange: "26/1/2023",
    },

    {
      docName: "Template",
      to: ["Chu Minh"],
      state: 2,
      signed: 1,
      needed: 1,
      timeChange: "10:13:29 am",
      dateChange: "26/1/2023",
    },
  ];

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
        minHeight: "calc(100vh - 130px)",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Typography>

      <TableContainer
        sx={{ borderTop: "1px solid #E0E0E0", marginTop: "20px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Subject</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>Last Change</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderLeft: "3px solid #2361CC",
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#D8EDFA !important",
                  },
                }}
                hover
              >
                <TableCell>
                  <IconState state={row.state} />
                </TableCell>
                <TableCell>
                  <Subject name={row.docName} to={row.to} />
                </TableCell>
                <TableCell>
                  <Status
                    state={row.state}
                    signed={row.signed}
                    needed={row.needed}
                  />
                </TableCell>
                <TableCell>
                  <Change date={row.dateChange} time={row.timeChange} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Subject = ({ name, to }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography sx={{ fontWeight: "bold" }}>
      Complete with eContract: {name}
    </Typography>
    <Typography sx={{ color: "#666666" }}>{`To: ${to.join(", ")}`}</Typography>
  </Box>
);

const Status = ({ state, signed, needed }) => (
  <>
    {state === 2 && <Typography>Completed</Typography>}
    {state !== 2 && (
      <Box sx={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <LinearProgress
          variant="determinate"
          color="success"
          value={(signed / needed) * 100}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{ color: "#666666" }}
          >{`${signed} / ${needed}`}</Typography>
          <Typography sx={{ color: "#666666" }}>
            {state === 0 ? "Action Required" : "Waiting for Others"}
          </Typography>
        </Box>
      </Box>
    )}
  </>
);

const Change = ({ date, time }) => (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Typography sx={{}}>{date}</Typography>
    <Typography sx={{ color: "#666666" }}>{time}</Typography>
  </Box>
);

const IconState = ({ state }) => (
  <>
    {state === 0 && <ErrorIcon color="action" />}
    {state === 1 && <QueryBuilderIcon color="action" />}
    {state === 2 && <CheckIcon color="success" />}
  </>
);
