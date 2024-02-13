import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import NavbarU from "./NavbarU";
import React, { useEffect, useState } from 'react';
import db from "../../firebase";
import "./User.css";
import { collection,doc,setDoc,getDocs,serverTimestamp,deleteDoc,getDoc,query,where ,onSnapshot,addDoc } from "firebase/firestore";
import "./BusBooker.css"
const BusBooker = ({busid,setshower}) => {
    const [buswhole,setbuswhole] = useState({});
    const user = auth.currentUser.email;
    const [isbook,setisbook]=useState(false);
    const [n,setn]=useState(1);
    const [m,setm]=useState(2);
    const [matrix,setmatrix]=useState({0:[0,0],1:[0,0]});
    const[color,setcolor]=useState("green");

    const[r,setr]=useState();
    const[c,setc]=useState();


    const getdata =  async (e)=>{

      console.log(busid);
      var x;
      var y;

      const q =  query(collection(db, "bus-data"), where("busid", "==", busid));
const unsubscribe = await onSnapshot(q, (querySnapshot) => {
  const buses = [];
  querySnapshot.forEach((doc) => {
    buses.push(doc.data());
    
  });
  setn(buses[0].rows);
  setm(buses[0].cols);
  setmatrix(buses[0].seats);
  setbuswhole(buses[0]);
  // console.log(buses);
  // console.log(buses[0].seats);
  var x = (parseFloat(buses[0].filled) )/ parseFloat(buses[0].occupancy);
  console.log(x);
  if(x<=0.6){
    setcolor("green");
  }
  else if(x<=0.9){
    setcolor("yellow");
  }
  else{
    setcolor("red");
  }

});

    }
    
    useEffect(() => {
      getdata();
    }, []);
    
    const bookfunc = async(e,i,j)=>{
      e.preventDefault();


      if(matrix[i][j]==1){
        alert("seat already booked ");
        return ;
      }



      
      

      //  from here
      // console.log(temp);
      const BusRef = collection(db, "booked-data");
      let obj = buswhole;
      console.log(obj);

          await addDoc(BusRef, {
              by:user,
              busdata:obj,
              seatrow:i,
              seatcol:j,
              busid:obj.busid,
              timestamp: serverTimestamp()

          });

          console.log("done");
      


          // update number of seats left



          console.log(obj);
          const docid = obj.busid;
          let temp= matrix;
          console.log(docid,i,j);

          temp[i][j]=1;
          await setDoc(doc(db,"bus-data",docid), {
              busid:docid,
              name:obj.name,
              from:obj.from,
              to:obj.to,
              occupancy:obj.occupancy,
              filled:obj.filled+1,
              rows:parseInt(obj.rows),
              cols:parseInt(obj.cols),
              seats:temp,
              workingdays:obj.workingdays,
              timestamp: serverTimestamp()

          })
          setr(i);
          setc(j);
            setisbook(true);
      



  }
    

    const generateTable = () => {

        const table = [];
    
        // Table header
    

    
        for(let i=0;i<n;i++){
          const row=[];

          for(let j=0;j<m;j++){

              

              row.push(
                <div className="col" style={{padding: "0"}} key={i+" "+j}>
                      <div className={(matrix[i][j]==0?"circle " +color:"circle gray")}  onClick={(e)=>bookfunc(e,i,j)}  > </div>
                </div>
              )
            
          }

          table.push(<div className="row">{row}</div>)
        }
    
        return table;
      };





    return(
<>
<button className="btn btn-primary" style={{position:"absolute",right:"10%",bottom:"75%"}} onClick={()=>setshower(false)}>Go back</button>
<h2 style={{position:"absolute",left:"3%",zIndex:"12",top:"15%"}}>click to grab your seat!</h2>
        <div className = "backg ">
        
        <div className="row col-md-6 window">
          
          <div className="col">
          <div className="row "><div class="col col-md-2  circle green align-self-end" style={{ position:"absolute",left:"18.5%"}} >Dr</div> </div>
        

        {
            generateTable()
        }
          </div>



        </div>
        {isbook? (<h1 className="showbook">Booked Seat is Row:{r} and Col:{c}</h1>):(<></>)   }
        </div>
        
        
        
        </>
               
    )    
}
export default BusBooker;