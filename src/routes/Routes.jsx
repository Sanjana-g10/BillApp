import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";

let routes= createBrowserRouter([
    {
        path:"/register",
        element:<Register></Register>
    },
    {
     path:"/login",
     element:<Login></Login>
    }
])


export default routes