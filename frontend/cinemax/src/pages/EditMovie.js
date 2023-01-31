import { Alert } from "@mui/material";
import MovieForm from "../components/MovieForm";
import { useState } from "react";

export default function EditMovie()
{
    const [formStatus, setFormStatus] = useState(null)

    //callback that's drilled to MovieForm.js - notify once the form has been submitted.
    const formResp = (boolValue) => {
        setFormStatus(boolValue)
    }
    return (
        <>
            {
                formStatus === null &&
                <Alert severity="info" sx={{textAlign: "left"}}>
                    Edit Movie - Notice!<br/>
                    You must fill all fields.<br/>
                    Geners must contain letters only. <br/>
                    For Genres field, in case of mentioning more than one genre, add a comma for sepration<br/>
                    Make sure to enter a valid url.
                </Alert>
            }
            {
                formStatus &&
                <Alert severity="success" sx={{textAlign: "left"}}>
                    Movie Updated Successfully
                </Alert>
            }
            {
                !formStatus && formStatus !== null &&
                <Alert severity="error" sx={{textAlign: "left"}}>
                    Fields are filled incorrectly
                </Alert>
            }
            <MovieForm callback={formResp}/>
        </>

    )
}