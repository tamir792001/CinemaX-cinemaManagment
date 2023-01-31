import '../styles/app.css'
import {useState} from 'react'
import { authFieldsValidator } from '../utils/general'
import { authUser, getAllUsers } from "../utils/fetchdata"
import { Button, TextField, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function CredentialsForm({mode, callback : notifyUserLoggedIn})
{
    const [user, setUser] = useState({username : "", password : ""})
    const [msg, setMsg] = useState({error : false, text : ""})
    const navigate = useNavigate()

    const handleChange = (e) => {
        let {name, value} = e.target
        setUser({...user, [name] : value})
    }

    const send = async (e) => {
        e.preventDefault()
        const validationResp = authFieldsValidator(mode, user.username, user.password )
        if (validationResp.error){
            setMsg({...msg, error : true, text : validationResp.error})
        }
        else{
            const resp = await authUser(user.username, user.password, mode)
            const successText = mode === "login" ? `Welcome Back ${user.username}!, You are successfully connected` : `Hello ${user.username}!, Welcome to CinemaX, You can Log in now`
            if (resp.error) setMsg({...msg, error: true, text: resp.error})
            else {
                if(mode === "login"){
                    console.log(resp.data.token)
                    sessionStorage.setItem("token", resp.data.token)
                    sessionStorage.setItem("userID", resp.data.userID)
                    sessionStorage.setItem("isAdmin", resp.data.isAdmin)
                    notifyUserLoggedIn()
                    navigate("/home")
                }
                setMsg({...msg, error: false, text: successText})
            } 
        }
    }
    return (
        <>
        <form className='card' onSubmit={send}>
            <TextField 
                error={msg.error}
                sx={{backgroundColor:"white", width: "75%"}}
                id='username' name='username' label="username"
                variant='filled'
                size='small'
                onChange={handleChange}/>
            <br/><br/>
            <TextField 
                error={msg.error}
                type="password" 
                sx={{backgroundColor: "white", width: "75%"}} 
                id='password' name='password' label="password" 
                variant='filled' 
                size='small' 
                onChange={handleChange}/>
            <br/><br/>
            {
                msg.error ? <Alert  sx={{ width: "75%", margin:"auto"}} severity='error'>{msg.text}</Alert> : <Alert  sx={{ width: "75%", margin:"auto", visibility : msg.text ? "visible" : "hidden"}} severity='success'>{msg.text}</Alert>
            }
            <br/>
            <Button variant='contained' color='secondary' type='submit'>{mode}</Button>
            <br/>
            <br/>
            <Button variant='outlined' color='secondary' onClick={() => navigate(-1)}>Back</Button>   
        </form>
        </>
  
    );
}