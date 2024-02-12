import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Navbar from "./Navbar";
import { useState } from "react";
import CreateBus from "./CreateBus";
import DeleteBus from "./DeleteBus"
import ChangeBus from "./ChangeBus";
const Profile = () => {
    const user = auth.currentUser;
    const [showupdate,setshowupdate]=  useState(false);

    const [showdelete,setshowdelete]=  useState(false);

    const [change,setchange]=useState(false);
     function showfunc() {
        if(showupdate){
            return (
                <CreateBus/>
            ) 
        }
        if(showdelete){
            return (
                <DeleteBus/>
            )
        }
        if(change){
            return (<ChangeBus/>)
        }
    }
    return(
        <div>
            <Navbar />
            <div className = "container">
            
                <div className = "row justify-content-center">
                    <div className = "col-md-7 text-center">
                        <p>Welcome <em className = "text-decoration-underline">{ user.email }</em>. You are logged in as a admin! choose the options you want to go for ....</p>
                        
                        <button className="btn btn-primary btn-lg" onClick={()=>{setshowupdate(true); setshowdelete(false);setchange(false);}}>Add new Bus Data</button>
&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary btn-lg" onClick={()=>{setshowupdate(false); setshowdelete(true);setchange(false);}}>Delete Bus Data</button>
&nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary btn-lg" onClick={()=>{setshowupdate(false); setshowdelete(false);setchange(true);}}>Update Bus Data</button>

                        <br></br><br></br><br></br><br></br>
                    </div>
                    
                </div>
            </div>  

            {showfunc()}
        </div>
             
    )    
}

export default Profile