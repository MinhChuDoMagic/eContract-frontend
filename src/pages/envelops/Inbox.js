import { Box, Typography } from "@mui/material";
import { useState } from "react";
import color from "../../constants/color";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Inbox = () => {
  const datas = [
    {
      name: "hi.pdf",
      to: ["Minh Chu", "Tran Pham"],
      done: 1,
    },
    {
      name: "hi.pdf",
      to: ["Minh Chu", "Tran Pham"],
      done: 2,
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
        height: "calc(100vh - 130px)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Inbox
      </Typography>

      <TableContainer>
        <Table sx={{ height: "120 vh" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Change</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
