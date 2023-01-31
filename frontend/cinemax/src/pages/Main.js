import { useNavigate } from "react-router-dom";
import { Typography, Button } from '@mui/material';
import '../styles/app.css'

export default function Main()
{
    const navigate = useNavigate()
    return (   
        <div className="maincontainer">
            <Typography variant="h1" component="h1">Welcome To CinemaX</Typography>
            <Typography variant="h2" component="h2">Manage easily your cinema business with CinemaX</Typography>
            <br/><br/>
            <Typography varient="h6" component="p">Only registered users can use CinemaX! Please Identify yourself first</Typography>
            <div className="loginandregister">
                <div>
                    <label htmlFor="loginBtn">Already Registered?</label><br/>
                    <Button variant="contained"
                            color="secondary"
                            id="loginBtn"
                            onClick={() => navigate("/login")}>
                    Login    
                    </Button>
                </div>
                <div>
                    <label htmlFor="registerBtn">New Here?</label><br/>
                    <Button variant="contained"
                            color="secondary"
                            id="registerBtn"
                            onClick={() => navigate("/register")}>
                    Register    
                    </Button>  
                </div> 
            </div>
        </div>

        
    );
}