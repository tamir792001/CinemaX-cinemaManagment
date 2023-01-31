import { Button, Alert, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Movie from "../components/Movie";
import { checkPremissions } from "../utils/general";


export default function Movies()
{
    const movies = useSelector(state => state.movies)
    const [displayedMovies, setDisplayedMovies] = useState(movies) 
    const users = useSelector(state => state.users)
    const [deletedMovieId, setDeletedMovieId] = useState("")
    const navigate = useNavigate()

    //useEffect for updating the local state (displayedMovies) when the movies value from useSelector is changed
    useEffect(() => {
      setDisplayedMovies(movies)
    },[movies])

    //callback that is sent to Movie.js comp - notify on movie deletion
    const setId = (movieId) => {
      setDeletedMovieId(movieId)
    }

    //when user type in the search field the displayedMovies will be updated accordingly.
    //if the value in the search text field is empty, the original movies (from useSelector) will be displayed.
    const handleChange = (e) => {
      const result = movies.filter(movie => movie.name.toLowerCase().startsWith(e.target.value))
      if (!e.target.value){
        setDisplayedMovies(movies)
      }
      else{

        setDisplayedMovies(result)     
      }
    }
    const goToCreateMovie = () => checkPremissions(users, sessionStorage["userID"], "Create Movies", () => navigate("addmovie"))
    return (
      <>
        <div style={{display: "flex", justifyContent:"space-around" , margin: "1rem 0"}}>
          <TextField error={displayedMovies.length === 0} sx={{backgroundColor: "white"}} variant="filled" size="small" label="Search Movie" onChange={handleChange}/>
          <Button variant="contained" color="secondary" onClick={goToCreateMovie}>Add Movie</Button>
        </div>
        {
          deletedMovieId && <Alert severity="success">Movie {deletedMovieId} is deleted successfully</Alert>
        }
        <div className="box">
          {
              displayedMovies.map(movie => {
                return <Movie key={movie._id} movieData={movie} callback={setId}/>
            })
          } 
        </div>
        
      </>
    );
}