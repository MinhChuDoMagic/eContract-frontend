import { Box } from "@mui/material"
import color from "../../constants/color";

export const ContractHome = () => {
    return(
        <Box sx={{
            bgcolor: color.White,
            borderRadius: "10px",
            borderColor: color.borderLightBlue,
            width: "100%",
            paddingX: "30px",
            paddingY: "30px",
            border: "1px solid #CCE7FC",
            height: 'calc(100vh - 130px)'
          }}>

        </Box>
    )
}