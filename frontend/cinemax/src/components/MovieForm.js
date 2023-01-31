import { TextField, Button, getLinearProgressUtilityClass } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addMovieAction, editMovieAction } from "../redux/actions";
import { createMovie, getMovie, updateMovie } from "../utils/fetchdata";
import { getToday } from "../utils/general";


export default function MovieForm({callback : notifyFormStatus})
{
    const location = useLocation()
    const [movie, setMovie] = useState(location.state)
    const [isFormErr, setIsFormErr] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isValidUrl = (urlString) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }
    const isFormValid = (formElements) => {
        const [movieName, premieredDate, genres, img, ...rest] = formElements
        if (!movieName.value || !genres.value || !img.value || !premieredDate.value) return false
        const genresTrimmed = genres.value.trim() //removing leading and trailing whitespaces grom genres value
        if (!isNaN(genresTrimmed)) return false
        if (genresTrimmed.includes(" ")) //if the trimmed string doesnt contain whitespaces => genres is valid
        {
            if (!genresTrimmed.includes(",")) return false
            const commaNum = genresTrimmed.match(/,/g)//counts the commas in value
            //console.log(commaNum.length)
            //console.log(commaNum)
            const spacesNum = genresTrimmed.replace(/,/g, "").match(/\s+/g) //replace all commas qith empty string and counts the whitespaces in value
            //console.log(spacesNum.length)
            //console.log(spacesNum)
            if(commaNum.length != spacesNum.length) return false //if commas number and white space number arent equel return false
        }
        if (!isValidUrl(img.value)) return false
        return true
       

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isFormValid(e.target.elements)){
            console.log("Errror")
            setIsFormErr(true)
            notifyFormStatus(false)
        }
        else{
            const [movieName, premieredDate, genres, img, ...rest] = e.target.elements
            const genresWithoutSpaces = genres.value.replace(/\s+/g, "")
            const genresArr = genresWithoutSpaces.split(",")
            const obj = {
                name: movieName.value,
                genres: genresArr,
                premieredDate: premieredDate.value,
                img: img.value.trim() //make sure there isn't trailing or leading spaces
            }
            if (movie) //if we are in edit mode and there is already the original movie data
            {
                console.log(obj)
                const resp = await updateMovie(movie._id, obj)
                obj._id = movie._id
                obj.subscriptions = movie.subscriptions
                if (resp.data) dispatch(editMovieAction(obj))
            }
            else
            {
                const idObj = await createMovie(obj)
                console.log(idObj)
                const movieObj = await getMovie(idObj.data)
                console.log(movieObj)
                if (idObj.data && movieObj.data)
                {
                    movieObj.data.subscriptions = []
                    dispatch(addMovieAction(movieObj.data)) 
                }
            }
            //need to be more specific wher to put an error
            setIsFormErr(false)
            notifyFormStatus(true)
        }
        e.target.reset()
        
    }
    
    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
            <TextField error={isFormErr} className="textfields" defaultValue={movie ? movie.name : ""} variant="filled" label="Movie Name" size="small" name="name"/>
            <br/><br/>
            <TextField error={isFormErr} className="textfields" defaultValue={movie ? movie.premieredDate : getToday()} variant="filled" label="Premired Date" size="small" type="date" name="premieredDate"/>
            <br/><br/>
            <TextField error={isFormErr} sx={{width : "80%"}} className="textfields" defaultValue={movie ? movie.genres.toString() : ""} variant="filled" label="Genres" size="small" placeholder="e.g Thriller, Documentary, Reallity" name="genres"/>
            <br/><br/>
            <TextField error={isFormErr} sx={{width : "80%"}} defaultValue={movie ? movie.img : ""} className="textfields" variant="filled" label="Image Url" size="small" type="url" name="img"/>
            <br/><br/>
            <Button variant="contained" color="secondary" type="submit">{movie ? "Edit Movie" : "Create Movie"}</Button>
            <br/><br/>
            <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Back</Button>
            </form>
        </div>     
    );
}