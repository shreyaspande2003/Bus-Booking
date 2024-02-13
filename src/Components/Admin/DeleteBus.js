import { useState } from "react";
import { auth } from "../../firebase";
import db from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection,doc,setDoc,getDoc,serverTimestamp,deleteDoc  } from "firebase/firestore";

const CreateBus = () => {

const[name,setname]=useState("");
const[id,setid]=useState("");
const[from,setfrom]=useState();
const[to,setto]=useState();
const[occupancy,setoccupancy]=useState();
const[content,setcontent]=useState(null);
const navigate = useNavigate();


const checkdb = async (e) => {
    e.preventDefault();
    try {

        const docRef = doc(db, "bus-data", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setcontent(docSnap.data());
            setname(docSnap.data().name);
            setid(docSnap.data().busid);
          console.log("Document data:", docSnap.data());

        } else {
          // docSnap.data() will be undefined in this case
          setname("No such bus found");
          console.log("No such document!");
        }
        
            
        
        
    } catch (error) {
        console.error("Error adding user data to Firestore: ", error);
    }
};


const deletedb = async (e) => {
    e.preventDefault();
    try {

        await deleteDoc(doc(db, "bus-data", id));
        

        alert("permanently deleted");  
        navigate("/admin");
        
    } catch (error) {
        console.error("Error adding user data to Firestore: ", error);
    }
};

// function createdb(){
//     db.collection("bus-data").doc(id).add({
       
//     });
// }


    return(
        <div >
            <form className="container" style={{margin:"auto"}}><br></br>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Enter Unique Bus ID:</label>
      <input type="text" onChange={(e)=>{setid(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 6220" required/>
    </div>


  </div>
        <br></br>
  <button type="submit" class="btn btn-primary" onClick={(e)=>{checkdb(e)}}>Check</button>

</form>    

        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        <h2>the name of bus-journey with id {id} is : {name}  </h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>

        <button type="submit" class="btn btn-primary" onClick={(e)=>{deletedb(e)}}>Click to confrim permanent deletion</button>
        </div>
        
        </div>
 
    )    
}

export default CreateBus