import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMemberAction, editMovieAction, updateSubscriptionAction } from "../redux/actions";
import { updateSubscription } from "../utils/fetchdata";
import { getToday } from "../utils/general";



export default function SubscribeToMovie({memberData: member, callback: notifyCloseBtnClicked})
{
    const [selection, setSelection] = useState("")
    const movies = useSelector(state => state.movies)
    const subscriptions = useSelector(state => state.subscriptions)
    const dispatch = useDispatch()

    const handleSelection = async () => {
        if(!selection) return
        const subscriptionObj = subscriptions.filter(sub => sub.memberID === member._id)[0]
        const today = getToday()
        const newSubscriptionDetails = {movieID: selection, date: today}
        console.log(newSubscriptionDetails)
        const resp = await updateSubscription(subscriptionObj._id, newSubscriptionDetails)
        if (resp.data){
            console.log(resp.data)

            //update member in store
            member.subscriptions.push(newSubscriptionDetails)
            dispatch(editMemberAction(member))

            //update movie in store
            const movie = movies.filter(movie => movie._id === selection)[0]
            movie.subscriptions.push({memberID: member._id})
            dispatch(editMovieAction(movie))

            //update subscription in store
            dispatch(updateSubscriptionAction(subscriptionObj._id, newSubscriptionDetails))
        }
        else{
            console.log("error")
        }
    }
    return (
        <div className="card subscription">
            <Button variant="text" color="secondary" size="small" onClick={notifyCloseBtnClicked}>Close</Button>
            <Typography variant="body1" component="h6">Subscribe To A New Movie</Typography>
            <br/>
            <FormControl>
                <InputLabel id="selectLabel">Movies</InputLabel>
                <Select sx={{marginRight:"5px", minWidth:"100px"}} labelId="selectLabel" defaultValue="" variant="outlined" label="Movie" onChange={(e) => setSelection(e.target.value)}>
                    {
                        movies.map(movie => <MenuItem key={movie._id} value={movie._id}>{movie.name}</MenuItem>)
                    }
                </Select>  
            </FormControl>
            <TextField sx={{color:"black", width:"125px"}} variant="outlined" name="date" value={getToday()} disabled/>
            <br/>
            {

            }
            <br/>
            <Button variant="outlined" color="secondary" size="small" onClick={handleSelection}>Subscribe Movie</Button>
        </div>
    )
}