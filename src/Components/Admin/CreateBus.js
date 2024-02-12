import { useState } from "react";
import { auth } from "../../firebase";
import db from "../../firebase";
import { collection,doc,setDoc,getDoc,serverTimestamp  } from "firebase/firestore";

const CreateBus = () => {

const[name,setname]=useState();
const[id,setid]=useState();
const[from,setfrom]=useState();
const[to,setto]=useState();
const[occupancy,setoccupancy]=useState(32);
const[days,setdays]=useState("");

const[rows,setrows]=useState(8);
const[cols,setcols]=useState(4);


const createdb = async (e) => {
    e.preventDefault();



    try {

        const BusRef = doc(db, "bus-data",id);
        const  BusSnap = await getDoc(BusRef);
        if (BusSnap.exists()) {
            alert("already present");
        }
        else{
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

        

        alert("added");
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
        <div >
            <form className="" style={{   marginLeft:" 30%"}}><br></br>
  <div class="form-row">
    <div class="form-group col-md-8">
      <label for="inputEmail4">Bus Name:</label>
      <input type="text" onChange={(e)=>{setname(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: sai travels" required/>
    </div>

    <div class="form-group col-md-8">
      <label for="inputEmail4">Unique Id for the Bus:</label>
      <input type="text" onChange={(e)=>{setid(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 1232" required/>
    </div>

    <div class="form-group col-md-8">
      <label for="inputEmail4">Bus From :</label>
      <input type="text" onChange={(e)=>{setfrom(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: NAGPUR" required/>
    </div>

    
    <div class="form-group col-md-8">
      <label for="inputEmail4">Bus To :</label>
      <input type="text" onChange={(e)=>{setto(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: BHILAI" required/>
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
          <div className="col-md-4"style={{color:"white"}} ><label for="inputEmail4">Number Of Rows :</label>
        <input type="text" onChange={(e)=>{setrows(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 8" value={rows}required/>
  </div>
          <div className="col-md-4" style={{color:"white"}}><label for="inputEmail4">Number Of Cols :</label>
        <input type="text" onChange={(e)=>{setcols(e.target.value)}} class="form-control" id="inputEmail4" placeholder="eg: 4" value={cols} required/>
  </div>
        </div>

    <br></br>
      <div className="form-group col-md-8">
      <button type="submit" class="btn btn-success" onClick={(e)=>{createdb(e)}}>Create</button>

      </div>

  </div>
        <br></br>
</form>    
        </div>
 
    )    
}

export default CreateBus