import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";



export default function Home()
{
    console.log(sessionStorage["isAdmin"])
    const navigate = useNavigate()
    return (
        <div className="box home">
            <Card sx={{ width: 320, backgroundColor:"hsl(221, 35%, 14%)", color: "white", marginRight:"1rem", marginBottom:"1rem" }}>
                <CardActionArea onClick={() => navigate("/movies")}>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://media.istockphoto.com/photos/popcorn-and-clapperboard-picture-id1191001701?b=1&k=20&m=1191001701&s=612x612&w=0&h=cL3uI5lZY3rjg7nb-58Y92qHDbxTTtYfsSchO74O9m8="
                    alt="movies"
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Movies
                    </Typography>
                    <Typography variant="body2" >
                        Get access to All Movies in CinemaX.<br/>
                        Expand your movies collection by adding new movies.<br/>
                        Edit & Delete if necessary
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ width: 320, backgroundColor:"hsl(221, 35%, 14%)", color: "white", marginRight:"1rem", marginBottom:"1rem" }}>
                <CardActionArea onClick={() => navigate("/members")}>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://www.azam.info/images/how-to-win-new-clients-sales-prospecting.jpg"
                    alt="members"
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Subscriptions
                    </Typography>
                    <Typography variant="body2" >
                        Get access to All subscriptions in CinemaX.<br/>
                        Manage your subscriptions easily. Add new members, Assign them movies. Edit & Delete necessary.
                    </Typography>
                </CardContent>
                </CardActionArea>
            </Card>
            {
                sessionStorage["isAdmin"] === "true" && 
                <Card sx={{ width: 320, backgroundColor:"hsl(221, 35%, 14%)", color: "white", marginRight:"1rem", marginBottom:"1rem" }}>
                    <CardActionArea onClick={() => navigate("/users")}>
                        <CardMedia
                        component="img"
                        height="140"
                        image="https://cdn-media-2.freecodecamp.org/w1280/5f9c9c8c740569d1a4ca32d2.jpg"
                        alt="users"
                        />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Users
                        </Typography>
                        <Typography variant="body2" >
                            Get access to All users in CinemaX.<br/>
                            Manage users for all of your employees, Add new users, Specify them relevent premissions. Edit & Delete if necessary.
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
            }
        </div>
    );
}