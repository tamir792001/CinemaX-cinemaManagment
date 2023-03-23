import { Button, Alert, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Member from "../components/Member";
import { checkPremissions } from "../utils/general";


export default function Members()
{
    const members = useSelector(state => state.members)
    const [displayedMembers, setDisplayedMembers] = useState(members)
    const users = useSelector(state => state.users)
    const [deletedMemberId, setDeletedMemberId] = useState("")
    const navigate = useNavigate()

    //useEffect for updating the local state (displayedMembers) when the members from useSelector is changed
    useEffect(() => {
        setDisplayedMembers(members)
    },[members])

    //callback that is sent to Member.js comp - notify on member deletion
    const setId = (memberId) => {
      setDeletedMemberId(memberId)
    }

    //when user type in the search field the displayedMembers will be updated accordingly.
    //if the value in the search text field is empty, the original members (from useSelector) will be displayed.
    const handleChange = (e) => {
        const result = members.filter(member => member.name.toLowerCase().startsWith(e.target.value))
        if (!e.target.value){
            setDisplayedMembers(members)
        }
        else{
            setDisplayedMembers(result)     
      }

    }
    const goToCreateMember = () => checkPremissions(users, sessionStorage["userID"], "Create Subscriptions", () => navigate("addmember"))
    return (
        <>
            <div style={{display: "flex", justifyContent:"space-around" , margin: "1rem 0"}}>
                <TextField error={displayedMembers.length === 0} variant="filled" size="small" label="Search Member" sx={{backgroundColor:"white"}} onChange={handleChange}/>
                <Button variant="contained" color="secondary" onClick={goToCreateMember}>Add Member</Button>
            </div>
            {
            deletedMemberId && <Alert severity="success">Member {deletedMemberId} is deleted successfully</Alert>
            }
            <div className="box">
                {
                    displayedMembers.map(member => {
                        return <Member key={member._id} memberData={member} callback={setId}/>
                    })
                }    
            </div>    
        </>     
    );
}