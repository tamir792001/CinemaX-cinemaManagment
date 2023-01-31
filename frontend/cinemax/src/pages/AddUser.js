import UserForm from "../components/UserForm";
import { Alert } from "@mui/material";
import { useState } from "react";



export default function AddUser()
{
    const [formStatus, setFormStatus] = useState(null)

    //callback that's drilled to UserForm.js - notify once the form has been submitted.
    const formResp = (boolValue) => {
        setFormStatus(boolValue)
    }
    return (
        <>
            {
                formStatus === null && 
                <Alert severity="info" sx={{textAlign: "left"}}>
                Add User - Notice!<br/>
                You must fill all fields.<br/>
                For premissions choose which are relevent for created user<br/>
                First & Last users's name must contain letters only<br/>
                Password must contain at least 5 characters.
                </Alert>
            }
            {
                formStatus &&
                <Alert severity="success" sx={{textAlign: "left"}}>
                User Successfully Added
                </Alert>
            }
            {
                !formStatus && formStatus !== null &&
                <Alert severity="error" sx={{textAlign: "left"}}>
                Fields are filled incorrectly
                </Alert>
            }
            <UserForm callback={formResp}/>
        </>
    )
}