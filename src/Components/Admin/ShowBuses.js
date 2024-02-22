
import { useState,useEffect } from "react";
import db from "../../firebase";
import { collection,doc,setDoc,getDoc,serverTimestamp ,getDocs } from "firebase/firestore";



const ShowBuses =()=>{


    const [total_data,settotal_data] = useState([]);

    
    useEffect(() => {

        getdata();
      }, []);



      const getdata = async ()=>{

            console.log("i am here");
            await getDocs(collection(db, "bus-data"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                settotal_data(newData);                
                // console.log(total_data, newData);
            })
        
       

      }

    return (



        <table class="table container table-dark table-striped ">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">UniqueId</th>
                                <th scope="col">Bus Name</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Working Days</th>
                                <th scope="col">Occupancy</th>
                                <th scope="col">Left</th>

                                </tr>
                            </thead>
                            <tbody>

                            {
                            total_data?.map((bus,i)=>(
                                <tr>
                                <th scope="row">{i+1}</th>
                                <td>{bus.busid}</td>
                                <td>{bus.name}</td>
                                <td>{bus.from}</td>
                                <td>{bus.to}</td>
                                <td>{bus.workingdays}</td>
                                <td>{bus.occupancy}</td>

                                <td>{bus.occupancy-bus.filled}</td>
                                </tr>
                            ))
                        }

                                
                            </tbody>
                            </table>
    )

}


export default ShowBuses;



