import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


//Render only when user STO is timed out
export default function STOError(){
    const navigate = useNavigate()
    return(
        <>
            <Typography variant="h3" component="h1" >Session Time Out</Typography>
            <Typography variant="h6" component="p" >Your session time has reached to its limit. please log-in again. for other problems contact your administartor</Typography>
            <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>Log-In</Button>
        </>
    )
}