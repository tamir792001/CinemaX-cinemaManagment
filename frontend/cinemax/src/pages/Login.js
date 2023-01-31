import { Typography } from "@mui/material";
import CredentialsForm from "../components/CredentialsForm";
import "../styles/app.css"


export default function Login({callback})
{
    return (
       <div className="logincontainer" >
            <Typography variant="h3" component="h1">Login CinemaX</Typography>
            <CredentialsForm mode="login" callback={callback}/>
       </div>
    );
}