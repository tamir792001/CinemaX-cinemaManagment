import { Accordion, AccordionDetails, AccordionSummary, colors, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { findMember } from "../utils/general"
import { useSelector } from "react-redux";

//maybe minimize the size of the accordion
export default function SubscriptionsOfMovie({subsList, movieID})
{
    const members = useSelector(state => state.members)
    const subscriptions = useSelector(state => state.subscriptions)

    const getDateOfSubscription = (memberId) => {
        const subscription = subscriptions.filter(sub => sub.memberID === memberId)[0]
        const subscriptionMovieDetails = subscription.movies.filter(obj => obj.movieID === movieID)[0]
        const [date, milisec] = subscriptionMovieDetails.date.split(".")
        return date
    }
    return (
        <Accordion sx={{backgroundColor: "rgb(7, 0, 65)", color: "white", width:"300px"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color :"white"}}/>}>
                <Typography variant="body1" component="p">Subscriptions</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    subsList.length === 0 && "No Subscriptions Yet"
                }
                {
                    subsList.length > 0 &&
                    <ul>
                        {subsList.map(sub => <li key={sub.memberID}>{findMember(members, sub.memberID).name} {getDateOfSubscription(sub.memberID)}</li>)}
                    </ul>
                }
            </AccordionDetails>
        </Accordion>
    )
}