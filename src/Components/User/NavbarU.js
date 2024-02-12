import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NavbarU=() =>{
    const navigate = useNavigate();
    const user = auth.currentUser;
    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }




    return (

<nav class="navbar navbar-dark bg-dark">
  <a class="navbar-brand" style={{margin:"auto",cursor:"pointer",fontFamily:"Lora",fontSize:"1.8em"}} onClick={(e)=>{navigate("/profile")}}>Bus Booking System</a>

  <a class="navbar-brand" style={{marginLeft:"80%",position:"absolute",cursor:"pointer"}} onClick={(e)=>{navigate("/oldbooking");}}>Previous Bookings</a>

  
  <form class="form-inline">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e)=>{logoutUser(e)}}>Logout</button>
  </form>
</nav>


    )

}


export default NavbarU;