import { Alert } from "@mui/material"
import { useState } from "react"
import MemberForm from "../components/MemberForm"
import MovieForm from "../components/MovieForm"


export default function EditMember()
{
    const [formStatus, setFormStatus] = useState(null)

    //callback that's drilled to MemberForm.js - notify once the form has been submitted.
    const formResp = (boolValue) => {
        setFormStatus(boolValue)
    }
    return (
        <>
            {
                formStatus === null &&
                <Alert severity="info" sx={{textAlign: "left"}}>
                    Add Member - Notice!<br/>
                    You must fill all fields.<br/>
                    Make sure to enter a valid email.
                </Alert>
            }
            {
                formStatus &&
                <Alert severity="success" sx={{textAlign: "left"}}>
                    Member Updated Successfully
                </Alert>
            }
            {
                !formStatus && formStatus !== null &&
                <Alert severity="error" sx={{textAlign: "left"}}>
                    Fields are filled incorrectly
                </Alert>
            }
            <MemberForm callback={formResp}/>
        </>
    )
}