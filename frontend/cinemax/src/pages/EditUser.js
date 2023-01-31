import UserForm from "../components/UserForm";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";



export default function EditUser()
{
    const [formStatus, setFormStatus] = useState(null)
    const location = useLocation()
    console.log(location.state)

    //callback that's drilled to UserForm.js - notify once the form has been submitted.
    const formResp = (boolValue) => {
        setFormStatus(boolValue)
    }
    return (
        <>
            {
                formStatus === null && 
                <Alert severity="info" sx={{textAlign: "left"}}>
                Edit User - Notice!<br/>
                As you can see, the data displayed below is current user's data.<br/>
                If you wish to change data, write it according th restrictions.<br/> 
                For premissions choose which are relevent for created user<br/>
                First & Last users's name must contain letters only.
                </Alert>
            }
            {
                formStatus &&
                <Alert severity="success" sx={{textAlign: "left"}}>
                User Successfully Updated
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