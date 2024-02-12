import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar=() =>{
    const navigate = useNavigate();
    const user = auth.currentUser;
    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }


    return (

<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" style={{margin:"auto",cursor:"pointer",fontFamily:"Volkorn",fontSize:"1.8em"}}>Bus Booking System</a>
  
   
  <form class="form-inline">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e)=>{logoutUser(e)}}>Logout</button>
  </form>
</nav>


    )

}


export default Navbar;