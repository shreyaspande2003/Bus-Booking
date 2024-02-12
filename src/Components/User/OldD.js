import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import NavbarU from "./NavbarU";
import React, { useEffect, useState } from 'react';
import db from "../../firebase";
import "./User.css"
import { collection,doc,setDoc,getDocs,serverTimestamp,deleteDoc,getDoc,query,where ,onSnapshot } from "firebase/firestore";

const OldD = () => {
    const [total_data,settotal_data] = useState([]);

    const user = auth.currentUser.email;
    const [allbus,setallbus]=useState({});

    const [thebus,setthebus]=useState();
      const getdata = async ()=>{


        await getDocs(query(collection(db, "booked-data"), where("by", "==", user)))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                console.log(total_data, newData);
            })
            await getDocs(query(collection(db, "bus-data")))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    let temp={};
                newData.map((d) =>{ 
                    temp[d.busid] = d;
                })
                // settotal_data(newData);                
                // console.log(total_data, newData);
                console.log(temp);
                setallbus(temp);
            })
            console.log("all are");
            console.log(allbus);


      }

      useEffect(() => {
        getdata();
      }, []);


      const deletebooking = async (ticket)=>{


            let busid = ticket.busid;
            let seatrow = ticket.seatrow;
            let seatcol = ticket.seatcol;
            let thebus={};
            // await deleteDoc(query(collection(db, "booked-data"), where("busid", "==", id)))
            await getDocs(query(collection(db, "booked-data"), where("busid", "==", busid),where("seatrow","==",seatrow),where("seatcol","==",seatcol)))
            .then((querySnapshot)=>{              
                // const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
                const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                console.log(newData);
                setthebus(newData[0].busdata);
                deleteDoc(doc(db,"booked-data",newData[0].id));

            })



            // update here
           let current_bus_data= (ticket.busdata);
            console.log("here")
            console.log(current_bus_data);
            let current_amt = allbus[busid].seats;
            current_amt[seatrow][seatcol] = 0;
            await setDoc(doc(db,"bus-data",busid), {
                busid:busid,
                name:current_bus_data.name,
                from:current_bus_data.from,
                to:current_bus_data.to,
                occupancy:current_bus_data.occupancy,
                filled:allbus[busid].filled-1,
                rows:parseInt(current_bus_data.rows),
                cols:parseInt(current_bus_data.cols),
                seats:current_amt,
                workingdays:current_bus_data.workingdays,
                timestamp: serverTimestamp()
  
            })

            // console.log(x);



            // console.log("the bus to be cancelled is",thebus);
            // // const docid = obj.id;
            // await setDoc(doc(db,"bus-data",thebus.id), {
            //     busid:thebus.id,
            //     name:thebus.name,
            //     from:thebus.from,
            //     to:thebus.to,
            //     occupancy:thebus.occupancy,
            //     filled:(thebus.filled)-1,
            //     timestamp: serverTimestamp()

            // })
            // // alert("booked");
  
            getdata();

      }




    return(
<>
        <NavbarU/>
        <div className = "container">
            <div className = "row justify-content-center">
                <div className = "col-md-4 text-center">
                    <p>Welcome <em className = "text-decoration-underline"></em>,Here  you can see your booking history !</p>
                    

                </div>
            </div>
        </div>
        <table class="table container table-dark table-striped ">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Bus Name</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Booked On</th>
                                <th scope="col">Bus Seat Position</th>
                                <th>book</th>
                                </tr>
                            </thead>
                            <tbody>

                            {
                            total_data?.map((bus,i)=>(
                                <tr>
                                <th scope="row">{i+1}</th>
                                <td>{bus.busdata.name}</td>
                                <td>{bus.busdata.from}</td>
                                <td>{bus.busdata.to}</td>
                                <td>{ Date((bus.busdata.timestamp.seconds)*1000)}</td>
                                <td>{ "Row is : "+bus.seatrow+"and Col is : "+bus.seatcol }</td>
                                <td><button className="btn btn-primary" type ="submit" onClick={()=>deletebooking(bus)}>Cancel Booking </button></td>
                                </tr>
                            ))
                        }
                
                            </tbody>
                            </table>
    
        
        </>
               
    )    
}
export default OldD;