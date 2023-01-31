import { Checkbox, TextField, Typography, FormControlLabel, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../utils/fetchdata";
import { useDispatch } from "react-redux";
import { addUserAction, editUserAction } from "../redux/actions";
import { maxWidth } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

const loadPremissions = (user ,premission) => {
    if (user?.premissions.includes(premission)){
            return true
    }
        return false
}

export default function UserForm({callback : notifyFormStatus})
{
    //how to implement this whole userObj state
    
    const location = useLocation()
    const [user, setUser] = useState(location.state)
    const [isFormErr, setIsFormErr] = useState(false)
    const [viewSubsChecked, setViewSubsChecked] = useState(loadPremissions(location.state, "View Subscriptions"))
    const [createSubsChecked, setCreateSubsChecked] = useState(loadPremissions(location.state, "Create Subscriptions"))
    const [updateSubsChecked, setUpdateSubsChecked] = useState(loadPremissions(location.state, "Update Subscriptions"))
    const [deleteSubsChecked, setDeleteSubsChecked] = useState(loadPremissions(location.state, "Delete Subscriptions"))
    const [viewMoviesChecked, setViewMoviesChecked] = useState(loadPremissions(location.state, "View Movies"))
    const [createMoviesChecked, setCreateMoviesChecked] = useState(loadPremissions(location.state, "Create Movies"))
    const [updateMoviesChecked, setUpdateMoviesChecked] = useState(loadPremissions(location.state, "Update Movies"))
    const [deleteMoviesChecked, setDeleteMoviesChecked] = useState(loadPremissions(location.state, "Delete Movies"))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const handleCheckButtonsChange = (e) => {
        switch(e.target.name){
            case "View Subscriptions":
                if (!(createSubsChecked || updateSubsChecked || deleteSubsChecked)){
                    setViewSubsChecked(e.target.checked)
                }
                break;
            case "Create Subscriptions":
                setCreateSubsChecked(e.target.checked)
                if (e.target.checked) setViewSubsChecked(true)
                break;
            case "Update Subscriptions":
                setUpdateSubsChecked(e.target.checked)
                if (e.target.checked) setViewSubsChecked(true)
                break;
            case "Delete Subscriptions":
                setDeleteSubsChecked(e.target.checked)
                if (e.target.checked) setViewSubsChecked(true)
                break;
            case "View Movies":
                if (!(createMoviesChecked || updateMoviesChecked || deleteMoviesChecked)){
                    setViewMoviesChecked(e.target.checked)  
                }
                break;
            case "Create Movies":
                setCreateMoviesChecked(e.target.checked)
                if (e.target.checked) setViewMoviesChecked(true)
                break
            case "Update Movies":
                setUpdateMoviesChecked(e.target.checked)
                if (e.target.checked) setViewMoviesChecked(true)
                break;
            case "Delete Movies":
                setDeleteMoviesChecked(e.target.checked)
                if (e.target.checked) setViewMoviesChecked(true)
                break;          
        }
    }

    const isValidForm = (elementslist) => {
        const [fname, lname, username, sto, ...rest] = elementslist
        if (!fname.value || !lname.value || !username.value || !sto.value) return false
        if (!/^[a-zA-Z]+$/.test(fname.value) || !/^[a-zA-Z]+$/.test(lname.value)) return false
        if (username.length < 5) return false
        if (isNaN(sto.value)) return false
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formsElements = e.target.elements //gets the whole form submition
        console.log(formsElements)
        console.log(isValidForm(formsElements))
        if (!isValidForm(formsElements)){ //checks whether the input values are valid
            setIsFormErr(true)
            notifyFormStatus(false)
        }
        else{
            //set the request obj
            const [fname, lname, username, sto, ...rest] = formsElements
            const obj = {
                fname: fname.value,
                lname: lname.value, 
                username: username.value, 
                sessionTimeOut: parseInt(sto.value), 
                premissions : []
            }
            //the first 8 elements in rest are the premissions checkboxes 
            rest.slice(0, 8).forEach(checkbox => {
                if (checkbox.checked){
                    obj.premissions.push(checkbox.name)
                }
            });

            if (user) { //if we are in edit mode and there is already the original user data
                obj.createdAt = user.createdAt
                obj._id = user._id
                console.log(obj)
                const resp = await updateUser(user._id ,obj)
                if (resp.data) dispatch(editUserAction(obj))
            }
            else{
                const id = await createUser(obj)
                const userObj = await getUser(id.data)
                dispatch(addUserAction(userObj.data))
                console.log(userObj)
            }
            console.log(obj)
            setIsFormErr(false)
            notifyFormStatus(true)
        }
        e.target.reset()
    }
    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
            <div style={{display: "flex", justifyContent: "space-around",marginBottom:"1rem"}}>
                <div>
                    <br/><br/>
                    <TextField error={isFormErr} defaultValue={user ? user.fname : ""} className="textfields" variant="filled" label="First Name" size="small" name="fname"/>
                    <br/><br/><br/>
                    <TextField error={isFormErr} defaultValue={user ? user.lname : ""} className="textfields" variant="filled" label="Last Name" size="small" name="lname"/>
                    <br/><br/><br/>
                    <TextField error={isFormErr} defaultValue={user ? user.username : ""} className="textfields" variant="filled" label="Username" size="small" name="username"/>
                    <br/><br/><br/>
                    <TextField error={isFormErr} defaultValue={user ? user.sessionTimeOut : ""} className="textfields" variant="filled" label="Session Time Out (STO)" size="small" type="number" name="sessionTimeOut"/>  
                </div>
                <div>
                    <Typography variant="h6" component="p">Premissions</Typography>
                    <ul>
                        <li>
                            <FormControlLabel
                             control={<Checkbox checked={viewSubsChecked} onChange={handleCheckButtonsChange} name="View Subscriptions"/>} 
                             label="View Subscriptions"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={createSubsChecked} onChange={handleCheckButtonsChange} name="Create Subscriptions"/>} 
                            label="Create Subscriptions"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={updateSubsChecked} onChange={handleCheckButtonsChange} name="Update Subscriptions"/>} 
                            label="Update Subscriptions"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={deleteSubsChecked} onChange={handleCheckButtonsChange} name="Delete Subscriptions"/>} 
                            label="Delete Subscriptions"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={viewMoviesChecked} onChange={handleCheckButtonsChange} name="View Movies"/>} 
                            label="View Movies"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={createMoviesChecked} onChange={handleCheckButtonsChange} name="Create Movies"/>} 
                            label="Create Movies"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked={updateMoviesChecked} onChange={handleCheckButtonsChange} name="Update Movies"/>} 
                            label="Update Movies"/>
                        </li>
                        <li>
                            <FormControlLabel 
                            control={<Checkbox checked ={deleteMoviesChecked} onChange={handleCheckButtonsChange} name="Delete Movies"/>} 
                            label="Delete Movies"/>    
                        </li> 
                    </ul>
                </div> 
            </div>
            <Button variant="contained" type ="submit" color="secondary">{user ? "Edit User" : "Create User"}</Button>
            <br/><br/>
            <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Back</Button>
            </form>
            
        </div>
    )
}