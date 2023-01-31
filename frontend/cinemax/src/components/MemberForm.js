import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addMemberAction, editMemberAction } from "../redux/actions";
import { createMember, getMember, updateMember } from "../utils/fetchdata";



export default function MemberForm({callback : notifyFormStatus})
{
    const location = useLocation()
    const [member, setMember] = useState(location.state)
    const [isFormErr, setIsFormErr] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isFormValid = (formElements) => {
        const [fname, lname, email, city] = formElements
        if (!fname.value || !lname.value || !email.value || !city.value) return false
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return false
        const fnameWithoutSpaces = fname.value.replace(/\s+/g, "")
        const lnameWithoutSpaces = lname.value.replace(/\s+/g, "")
        const cityhWithoutSpaces = city.value.replace(/\s+/g, "")
        if (!/^[a-zA-Z]+$/.test(fnameWithoutSpaces) || !/^[a-zA-Z]+$/.test(lnameWithoutSpaces) || !/^[a-zA-Z]+$/.test(cityhWithoutSpaces)) return false
        return true
    }
    const handleSubmit =  async(e) => {
        e.preventDefault()
        if(!isFormValid(e.target.elements)){
            console.log("Error")
            notifyFormStatus(false)
            setIsFormErr(true)
        }
        else{
            const [fname, lname, email, city] =  e.target.elements
            const obj = {
                name: `${fname.value.trim()} ${lname.value.trim()}`,
                email: email.value,
                city: city.value.trim()
            }
            e.target.reset()
            if(member)
            {
                const resp = await updateMember(member._id, obj)
                obj._id = member._id
                obj.subscriptions = member.subscriptions
                if(resp.data) dispatch(editMemberAction(obj))
            }
            else
            {
                const idObj = await createMember(obj)
                console.log(idObj)
                const newMemberObj = await getMember(idObj.data.memberID)
                newMemberObj.data.subscriptions = []
                console.log(newMemberObj)
                dispatch(addMemberAction(newMemberObj.data)) 
            }
            
            console.log(obj)
            notifyFormStatus(true)
            setIsFormErr(false)
        }
        
    }

    return (
        <div className="card">
            <form style={{textAlign: "left"}} onSubmit={handleSubmit}>
                <div style={{paddingLeft: "3rem"}}>
                    <br/><br/>
                    <TextField error={isFormErr} className="textfields" defaultValue={member ? member.name.split(" ")[0] : ""} variant="filled" label="First Name" name="fname" size="small"/>
                    <br/><br/>
                    <TextField error={isFormErr} className="textfields" defaultValue={member ? member.name.split(" ")[1] : ""} variant="filled" label="Last Name" name="lname" size="small"/>
                    <br/><br/>
                    <TextField error={isFormErr} className="textfields" defaultValue={member ? member.email : ""} variant="filled" label="Email" type="email" name="email" size="small"/>
                    <br/><br/>
                    <TextField error={isFormErr} className="textfields" defaultValue={member ? member.city : ""} variant="filled" label="City" name="city" size="small"/>
                </div>
                <div style={{textAlign: "center", marginTop:"2rem"}}>
                    <Button variant="contained" type="submit" color="secondary">{member ? "Edit Member" : "Create Member"}</Button>
                    <br/><br/>
                    <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Back</Button>
                </div>
            </form>
        </div>
    )
}