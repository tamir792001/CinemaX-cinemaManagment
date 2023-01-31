import { Typography } from "@mui/material";
import CredentialsForm from "../components/CredentialsForm";
import "../styles/app.css"


export default function Register()
{
    return (
        <div className="logincontainer" >
            <Typography variant="h3" component="h1">Register CinemaX</Typography>
            <CredentialsForm mode="register"/>
       </div>
    );
}