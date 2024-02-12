import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import NavbarU from "./NavbarU";
import React, { useEffect, useState } from 'react';
import db from "../../firebase";
import "./User.css"
import { collection,doc,setDoc,getDocs,serverTimestamp,deleteDoc,getDoc ,addDoc,query,where,onSnapshot } from "firebase/firestore";
import BusBooker from "./BusBooker";
import ReactLoading from "react-loading";

const User = () => {
    const [total_data,settotal_data] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = auth.currentUser.email;
    const[from ,setfrom]=useState("");
    const [to,setto] = useState("");

    const [buss,setbuss]=useState();

    const [bookbus,setbookbus]=useState(false);

    const bookfunc = async(e,id)=>{




        
        
        let obj = total_data[id];
        // console.log(obj);
        setbuss(obj.busid);
        setbookbus(true);
        



    }




      const getdata = async ()=>{
        if(from=="" || to ==""){
            console.log("i am here");
            await getDocs(collection(db, "bus-data"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                // console.log(total_data, newData);
            })
        }
        else{
            await getDocs(query(collection(db, "bus-data"),where("from","==",from)))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                // console.log(total_data, newData);
            })     
        }

      }

      const fetchdata = async (e)=>{
        e.preventDefault();
        if(from=="" || to ==""){
            console.log("i am here");
            await getDocs(collection(db, "bus-data"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                // console.log(total_data, newData);
            })
        }
        else{
            await getDocs(query(collection(db, "bus-data"),where("from","==",from)))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                // console.log(total_data, newData);
            })     
        }

      }

      useEffect(() => {
        // console.log("always");
        setTimeout(() => {
            setIsLoading(false);
          }, 1500);
        getdata();
      }, []);


    if(isLoading){
        return (
            <div className="" style={{position:"absolute", left:"50%",top:"50%",transform:"translate(-50%,-50%)"}} >
                <ReactLoading         
            type={"bars"}
            color={"#ad1012"}
            height={100}
            width={100} />
            </div>
            
        )
    }








    return(
        <>
        <NavbarU/>

{!bookbus?

(
<>

<div className = "container">

            <div className = "row justify-content-center">
                <div className = "col-md-4 text-center">
                    <p>Welcome <em className = "text-decoration-underline"></em>. You are logged in as a common user!</p>

                </div>


<form>
  <div class="row">
    <div class="col">
      <input type="text"onChange={(e)=>{setfrom(e.target.value)}} class="form-control" placeholder="From"/>
    </div>
    <div class="col">
      <input type="text" onChange={(e)=>{setto(e.target.value)}} class="form-control" placeholder="To"/>
    </div>
  </div>
  <br></br>
  <div class="row">
    <div class="col">
        <button className="btn btn-secondary" onClick={(e)=>fetchdata(e)}>Check Buses</button>
    </div>
  </div>
  <br></br>
</form>
<br>
</br><br></br>
            </div>
        </div>



        <table class="table container table-dark table-striped ">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Bus Name</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Working Days</th>
                                <th scope="col">Occupancy</th>
                                <th scope="col">Left</th>

                                <th>book</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                            total_data?.map((bus,i)=>(
                                <tr>
                                <th scope="row">{i+1}</th>
                                <td>{bus.name}</td>
                                <td>{bus.from}</td>
                                <td>{bus.to}</td>
                                <td>{bus.workingdays}</td>
                                <td>{bus.occupancy}</td>

                                <td>{bus.occupancy-bus.filled}</td>
                                <td><button className="btn btn-primary" type ="submit" onClick={(e)=>bookfunc(e,i)}>Book </button></td>
                                </tr>
                            ))
                        }

                                
                            </tbody>
                            </table>

</>

):(


    // <h1>This is a bus</h1>
    <BusBooker busid={buss} setshower={setbookbus}/>
)}



                       
        
        
        </>
               
    )    
}

export default User