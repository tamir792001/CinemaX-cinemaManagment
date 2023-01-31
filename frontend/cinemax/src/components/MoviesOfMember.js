import { Accordion, AccordionDetails, AccordionSummary, colors, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { findMovie } from "../utils/general"
import { useSelector } from "react-redux";

//maybe minimize the size of the accordion
export default function MoviesOfMember({moviesList})
{
    const movies = useSelector(state => state.movies)

    return (
        <Accordion sx={{backgroundColor: "rgb(7, 0, 65)", color: "white", width:"300px"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color :"white"}}/>}>
                <Typography variant="body1" component="p">Watched Movies</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    moviesList.length === 0 && "No Movies Watched Yet"
                }
                {
                    moviesList.length > 0 &&
                    <ul>
                        {moviesList.map(sub => <li key={sub.movieID}>{findMovie(movies, sub.movieID).name} {sub.date}</li>)}
                    </ul>
                }
            </AccordionDetails>
        </Accordion>
    )
}