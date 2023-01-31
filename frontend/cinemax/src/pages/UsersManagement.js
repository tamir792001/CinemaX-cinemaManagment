import { Alert, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../components/User";



export default function UsersManagement() 
{
    const users = useSelector(state => state.users)
    const [deletedUserId, setDeletedUserId] = useState("")
    const navigate = useNavigate()

    const setId = (userId) => {
        setDeletedUserId(userId)
    }
    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => navigate("adduser")}>Add User</Button>
            {
                deletedUserId && <Alert severity="success">User {deletedUserId} is deleted successfully</Alert>
            }
            <div className="box">
                {
                    users.map(user => <User key={user._id} userData={user} callback={setId}/>)
                }   
            </div>
            
        </>
    );
}