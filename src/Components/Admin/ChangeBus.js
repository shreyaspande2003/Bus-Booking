import { useState } from "react";
import { auth } from "../../firebase";
import db from "../../firebase";
import { collection,doc,setDoc,getDoc,serverTimestamp,deleteDoc  } from "firebase/firestore";

const ChangeBus = () => {

const[name,setname]=useState("");
const[id,setid]=useState("");
const[from,setfrom]=useState("");
const[to,setto]=useState("");
const[occupancy,setoccupancy]=useState(0);
const[content,setcontent]=useState(null);
const [days,setdays] = useState("");
const[rows,setrows]=useState(8);
const[cols,setcols]=useState(4);

const changedb = async (e) => {
    e.preventDefault();



    try {

        const BusRef = doc(db, "bus-data",id);
        console.log(id);
        const  BusSnap = await getDoc(BusRef);
        var temp={}
        for(var i=0;i<rows;i++){
          var arr=[];
          for(var j=0;j<cols;j++){
            arr.push(0);
          }
          temp[i] = arr;
        }
            await setDoc(doc(db,"bus-data",id), {
              busid:id,
              name:name,
              from:from,
              to:to,
              occupancy:parseInt( occupancy),
              filled:0,
              rows:parseInt(rows),
              cols:parseInt(cols),
              seats:temp,
              workingdays:days,
              timestamp: serverTimestamp()

            })

        

        alert("updated");
        
            
        
        
    } catch (error) {
        console.error("Error adding user data to Firestore: ", error);
    }
};

const checkdb = async (e) => {
    e.preventDefault();
    try {

        const docRef = doc(db, "bus-data", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setcontent(docSnap.data());
            setname(docSnap.data().name);
            setid(docSnap.data().busid);
            setfrom(docSnap.data().from);
            setto(docSnap.data().to);
            setoccupancy(docSnap.data().occupancy);
            setdays(docSnap.data().workingdays);
            setrows(docSnap.data().rows)
            setcols(docSnap.data().cols)
            console.log(id);
            alert("Bus Found... update acordingly");
        //   console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          setname("No such bus found");
          console.log("No such document!");
        }
        
            
        
        
    } catch (error) {
        console.error("Error adding user data to Firestore: ", error);
    }
};




// function createdb(){
//     db.collection("bus-data").doc(id).add({
       
//     });
// }


    return(
        < >
        <div className="container">
            <div className="row">
                <div className="col">
            <form className="container" style={{margin:"auto"}}><br></br>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Bus ID:</label>
      <input type="text" onChange={(e)=>{setid(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 6220" required/>
    </div>


  </div>
        <br></br>
  <button type="submit" class="btn btn-primary" onClick={(e)=>{checkdb(e)}}>Check</button>

</form> 
                </div>
                <div className="col">
                <div class="form-row">
    <div class="form-group col-md-8">
      <label for="inputEmail4">Bus Name:</label>
      <input type="text" onChange={(e)=>{setname(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: sai travels" value={name} required/>
    </div>

    <div class="form-group col-md-8">
      <label for="inputEmail4">Unique Id for the Bus:</label>
      <input type="text" readOnly class="form-control" id="inputEmail4" placeholder={id} value={id} required/>
    </div>

    <div class="form-group col-md-8">
      <label for="inputEmail4">Bus From :</label>
      <input type="text" onChange={(e)=>{setfrom(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: NAGPUR"  value={from}required/>
    </div>

    
    <div class="form-group col-md-8">
      <label for="inputEmail4" >Bus To :</label>
      <input type="text" onChange={(e)=>{setto(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: BHILAI" value={to} required/>
    </div>



    <div className="row">
        <div className="col-md-4"style={{color:"white"}} ><label for="inputEmail4">Total Occupancy :</label>
      <input type="number" onChange={(e)=>{setoccupancy(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 8" value={occupancy}required/>
 </div>
        <div className="col-md-4" style={{color:"white"}} ><label for="inputEmail4">Working Days :</label>
      <input type="text" onChange={(e)=>{setdays(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: Mon,Wed,Sat" value={days} required/>
 </div>
      </div>


    <div className="row">
        <div className="col-md-4"><label for="inputEmail4" style={{color:"white"}}>Number Of Rows :</label>
      <input type="text" onChange={(e)=>{setrows(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 8" value={rows}required/>
 </div>
        <div className="col-md-4"><label for="inputEmail4" style={{color:"white"}}>Number Of Cols :</label>
      <input type="text" onChange={(e)=>{setcols(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 4" value={cols} required/>
 </div>
      </div>
    <br></br>
      <div className="form-group col-md-8">
      <button type="submit" class="btn btn-success" onClick={(e)=>{changedb(e)}} >Update</button>

      </div>

  </div>
                </div>
            </div>
        </div>
   
        

</>

    )    
}

export default ChangeBus;