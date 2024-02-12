import Layout from "./Layout";
import Login from "./Login";
import Signup from "./Signup.js";
import User from "./Components/User/User.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin.js"
import CreateBus from "./Components/Admin/CreateBus.js";
import OldD from "./Components/User/OldD.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = { <Layout></Layout> }>
            <Route index element = { <Login></Login> }></Route>
            <Route path = "/signup" element = { <Signup></Signup> } ></Route>
            <Route path = "/create" element = { <CreateBus></CreateBus> } ></Route>
            <Route path = "/profile" element = { <User></User> }></Route>

            <Route path = "/oldbooking" element = { <OldD></OldD> }></Route>
            <Route path = "/admin" element = { <Admin></Admin> }></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App