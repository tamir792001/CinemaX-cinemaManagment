import { Typography, Card, CardContent, CardMedia,CardActions, Button, CardHeader, Avatar } from "@mui/material"
import { color } from "@mui/system"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteMemberAction } from "../redux/actions"
import { deleteMember } from "../utils/fetchdata"
import { checkPremissions } from "../utils/general"
import MoviesOfMember from "./MoviesOfMember"
import SubscribeToMovie from "./SubscribeToMovie"

export default function Member({memberData : member, callback: notifyDeletionResp})
{
    const [showSubscribeToMovie, setShowSubscribeToMovie] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(state => state.users)

    const handleDeletion = async() => {
        const resp = await deleteMember(member._id)
        if (resp.data){
            dispatch(deleteMemberAction(member._id))
            notifyDeletionResp(member._id)  
        }  
    }

    const generateInitials = () => {
        const names = member.name.split(" ")
        const initials = names.map(part => part[0])
        return initials
    }

    const hideSubscribeToMovieComp = () => {
        setShowSubscribeToMovie(false)
    }

    const goToDeleteMember = () => checkPremissions(users,sessionStorage["userID"], "Delete Subscriptions", handleDeletion)
    const goToEditMember = () => checkPremissions(users, sessionStorage["userID"], "Update Subscriptions", () => navigate(`editmember/${member._id}`, {state : member} ) )
    const goToSubscribeMovie = () => checkPremissions(users, sessionStorage["userID"], "Update Subscriptions", () => setShowSubscribeToMovie(true))
    return (
        <Card sx={{ width: "400px",  backgroundColor:"hsl(221, 35%, 14%)", textAlign:"left", margin:"10px" }}>
            <CardContent>
                <div style={{display: "flex", marginBottom:"1rem"}}>
                    <Avatar sx={{ border : "1px black solid",backgroundColor: "rgb(141, 0, 137)", color: "white", marginRight:"1rem"}} >
                    {
                        generateInitials()
                    }
                    </Avatar>
                    <Typography sx={{marginTop: "5px"}} gutterBottom variant="h5" component="div" color="secondary">
                    {member.name}
                    </Typography>   
                </div>
                <Typography gutterBottom variant="body1" component="div" color="secondary">
                Email: {member.email}
                </Typography>
                <Typography gutterBottom variant="body1" component="div" color="secondary">
                City: {member.city}
                </Typography>
                <MoviesOfMember moviesList={member.subscriptions}/> 
                {
                    showSubscribeToMovie
                    ? 
                    <SubscribeToMovie memberData={member} callback={hideSubscribeToMovieComp}/> 
                    : 
                    <Button variant="text" color="secondary" onClick={goToSubscribeMovie}>Subscribe A New Movie</Button>
                }
            </CardContent>
            <CardActions>
                <Button size="small" onClick={goToEditMember} >Edit</Button>
                <Button size="small" color="error" onClick={goToDeleteMember}>Delete</Button>
            </CardActions>   
        </Card>
    )
}