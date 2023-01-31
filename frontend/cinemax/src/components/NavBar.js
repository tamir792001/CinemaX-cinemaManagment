import {Link} from "react-router-dom"
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/app.css"
import MovieIcon from '@mui/icons-material/Movie';
import { useSelector } from "react-redux";
import { checkPremissions } from "../utils/general";

export default function Navbar({callback : notifyUserLoggedOut, isAdmin})
{
    //add some code that will selecet what to put on the nav bar
    const navigate = useNavigate()
    const users = useSelector(state => state.users)

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userID")
        sessionStorage.removeItem("isAdmin")
        notifyUserLoggedOut();
        navigate("/")
    }
    const goToMovies = () => checkPremissions(users, sessionStorage["userID"], "View Movies", () => navigate("/movies"))
    const goToMembers = () => checkPremissions(users, sessionStorage["userID"], "View Subscriptions", () => navigate("/members"))
    
    return (
        <div className="navbar">
            <div>
                <MovieIcon sx={{mr: "5px"}} fontSize="small"/>
                <Typography varient="h6" fontWeight="700" component="span">CinemaX</Typography>
            </div>
            <div className="navbar-btns">
                <Button variant="text" sx={{color: "white"}} onClick={() => navigate("/home")}>Home</Button>
                <Button variant="text" sx={{color: "white"}} onClick={goToMovies}>Movies</Button>
                <Button variant="text" sx={{color: "white"}} onClick={goToMembers}>Members</Button>
                {
                    isAdmin && <Button variant="text" sx={{color: "white"}} onClick={() => navigate("/users")}>Users Managment</Button>
                }
                <Button variant="text" sx={{color: "white"}} onClick={handleLogout}>Logout</Button>   
            </div>
            
        </div>
    );
}