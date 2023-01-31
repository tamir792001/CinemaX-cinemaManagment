import CredentialsForm from "./components/CredentialsForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import './styles/app.css'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Main from "./pages/Main";
import { useEffect, useState } from "react";
import { getAllMembers, getAllMovies, getAllSubscriptions, getAllUsers } from "./utils/fetchdata";
import { findUser } from "./utils/general";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore, restartStore } from "./redux/actions";
import { Typography } from "@mui/material";
import UsersManagement from "./pages/UsersManagement";
import PageLayout from "./components/PageLayout";
import Members from "./pages/Members";
import Movies from "./pages/Movies";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import axios from "axios";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import STOError from "./pages/STOError";

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [isAdminLogged, setIsAdminLogged] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  //useEffect for request & response interceptors. could be written in its own file by i prefered that way - so ejecting the interceptor would be happening.
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      config =>{
      const token = sessionStorage.getItem("token")
      if (token){
        config.headers["x-access-token"] = token
      }
      return config
    },
    err => {
      return Promise.reject(err)
    })

    //detecting whether user's STO reached to its limit
    const responseInterceptor = axios.interceptors.response.use(
      response => {
        console.log(response)
        return response
    },
    err=> {
      console.log(err)
      if (err.response.status === 403){
        sessionStorage.clear()
        navigate("/stoError")
        setIsUserLogged(false)
        setIsAdminLogged(false)
      }
      return Promise.reject(err)
    })

    //ejecting the interceptors once the app.js is unmount for removing these instances
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    } 

  }, [])

  //useEffect for fetching the current data, once a user is logged in.
  //The data is consumed from the CinemaxWs.
  useEffect(() => {
    const fetchInitialData = async () => {
      try{
        const resps = await Promise.all([getAllUsers(), getAllMembers(), getAllMovies(), getAllSubscriptions()])
        const [usersResp, membersResp,moviesResp, subsResp ] = resps
        const initials = {
                          users: usersResp.data,
                          members: membersResp.data, 
                          movies: moviesResp.data, 
                          subscriptions : subsResp.data
                         }
        dispatch(initializeStore(initials))
      }
      catch (err) {
        console.log(err)
      }
    }
    if(isUserLogged) {
      fetchInitialData()
    }
  }, [isUserLogged])

  //callback that's drilled to Login.js and than to CredentialForms.js. notify once a user has logged in.
  const userLoggedIn = () => {
    if (sessionStorage.getItem("isAdmin") === "true"){
      setIsAdminLogged(true)
    }
    setIsUserLogged(true)
  }

  //callback that's drilled to Navbar.js - notify once a user has logged out.
  const userLoggedOut = () => {
    dispatch(restartStore())
    setIsUserLogged(false)
    setIsAdminLogged(false)
  }

  return (
    <div className="container">
      {/*Depending on isUserLogged state, a custom navbar is rendered*/}
      {
        isUserLogged && <Navbar callback={userLoggedOut} isAdmin={isAdminLogged}/>
      }
      {
        isUserLogged && <Typography varient="h4" component="p">User: {users.length > 0 && findUser(users, sessionStorage["userID"]).username}</Typography>
      }
      <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/login" element={<Login callback={userLoggedIn}/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/stoError" element={<STOError/>}/>
      <Route element={<PageLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/users">
          <Route index element={<UsersManagement/>}/>
          <Route path="adduser" element={<AddUser/>}/>
          <Route path="edituser/:id" element={<EditUser/>}/>
        </Route>
        <Route path="/movies">
          <Route index element={<Movies/>}/>
          <Route path="addmovie" element={<AddMovie/>}/>
          <Route path="editmovie/:id" element={<EditMovie/>}/>
        </Route>
        <Route path="/members">
          <Route index element={<Members/>}/>
          <Route path="addmember" element={<AddMember/>}/>
          <Route path="editmember/:id" element={<EditMember/>}/>
        </Route>
        
      </Route>
      </Routes>
    </div>    
  );
}

export default App;
