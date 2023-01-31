import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserAction } from "../redux/actions";
import { deleteUser } from "../utils/fetchdata";


export default function User({userData: user, callback : notifyDeletionResp})
{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDeletion = async () => {
    const resp = await deleteUser(user._id)
    if(resp.data){
      dispatch(deleteUserAction(user._id))
      notifyDeletionResp(user._id)
    }
  }
    return (
      <div className="card user">
        <Typography variant="h5" component="h5">
           {user.fname + " " + user.lname} 
        </Typography>
        <Typography variant="subtitle1" component="p">
          <strong>Username: </strong> 
          {user.username}    
        </Typography>
        <Typography variant="subtitle1" component="p"> 
          <strong>Session Time Out (STO): </strong> 
          {user.sessionTimeOut}
        </Typography>
        <Typography variant="subtitle1" component="p"> 
          <strong>Created At: </strong> 
          {user.createdAt} 
        </Typography>
        <Typography variant="subtitle1" component="p">  
          <strong>Permissions: </strong>
          {user.premissions.map((p, index) => <span key={index}>{p}, </span>)}
        </Typography>
        <div style={{ textAlign:"right"}}>
          <Button variant="text" onClick={() => navigate(`edituser/${user._id}`, {state : user})}>Edit</Button>
          <Button variant="text" color="error" onClick={handleDeletion}>Delete</Button>
        </div>
      </div>
    );
}