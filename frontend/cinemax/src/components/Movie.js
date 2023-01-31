import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteMovieAction } from "../redux/actions"
import { deleteMovie } from "../utils/fetchdata"
import { checkPremissions } from "../utils/general"
import SubscriptionsOfMovie from "./SubscriptionsOfMovie"

//check the widths
export default function Movie({movieData : movie, callback : notifyDeletionResp}) 
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const handleDeletion = async() => {
        const resp = await deleteMovie(movie._id)
        if (resp.data){
            dispatch(deleteMovieAction(movie._id))
            notifyDeletionResp(movie._id)  
        } 
    }
    const goToDeleteMovie = () => checkPremissions(users,sessionStorage["userID"], "Delete Movies", handleDeletion)
    const goToEditMovie = () => checkPremissions(users, sessionStorage["userID"], "Update Movies", () => navigate(`editmovie/${movie._id}`, {state : movie} ) )

    return (
        <Card sx={{ maxWidth: 450, display: "flex", backgroundColor:"hsl(221, 35%, 14%)", textAlign:"left", margin:"10px" }}>
            <CardMedia
            sx={{ width: 120 }}
            image={movie.img}
            title={movie.name}
            />
            <div style={{flexDirection:"column"}}>
               <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="secondary">
                {movie.name}
                </Typography>
                <Typography variant="body2" component="div" color="white">
                Genres: {movie.genres.map((genre, index) => <span key={index}>| {genre} </span>)}
                </Typography>
                <Typography variant="body2" component="div" color="white">
                    <SubscriptionsOfMovie subsList={movie.subscriptions} movieID={movie._id}/> 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={goToEditMovie} >Edit</Button>
                <Button size="small" color="error" onClick={goToDeleteMovie}>Delete</Button>
            </CardActions> 
            </div>
            
    </Card>
    )
}