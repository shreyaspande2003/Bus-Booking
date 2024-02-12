import { Outlet } from "react-router-dom";
import "./Layout.css"
const Layout = () => {
    return(
        <>
        <div class="background"></div>
        <Outlet /></>


    )
}

export default Layout