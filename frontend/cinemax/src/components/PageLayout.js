import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, Outlet} from "react-router-dom";



export default function PageLayout()
{
    const location = useLocation()
    const [pageText, setPageText] = useState({title : "" , details : ""})

    useEffect(() => {
        const page = location.pathname.slice(1)
        switch(page){
            case "users":
                setPageText({...pageText, title: "Users Managment", details : "These are all the users exist in CinemaX. You can Edit, Create & Delete users"})
                break;
            case "members":
                setPageText({...pageText, title: "Members", details: "These are all the subscriptions existing in CinemaX. Depending your premissions you can View, Update, Create & Delete subscriptions"})
                break;
            case "movies":
                setPageText({...pageText, title: "Movies", details: "These are all the movies existing in CinemaX. Depending your premissions you can View, Update, Create & Delete movies"})
                break;
            case "home":
                setPageText({...pageText, title: "CinemaX", details: "Welcome back! Where would you like to start"})
                break;   
        }
    }, [location])

    return (
        <div className="container screen">
            <Typography variant="h2" component="h2">{pageText.title}</Typography>
            <Typography variant="body1" component="p">{pageText.details}</Typography>
            <Outlet/>
        </div>
    );
}