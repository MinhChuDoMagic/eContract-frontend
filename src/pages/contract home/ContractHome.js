import { Box } from "@mui/material"
import { useSelector } from "react-redux";
import color from "../../constants/color";
import { selectUser } from "../../redux/userSlice";

export const ContractHome = () => {
    const user = useSelector(selectUser)
    console.log(user);
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