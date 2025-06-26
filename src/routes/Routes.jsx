import { createBrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import About from "../components/user/main/about/About";
import Addbills from "../components/user/main/addbills/Addbills";
import Filterbills from "../components/user/main/filterBills/Filterbills";
import Main from "../components/user/Main";
import Home from "../components/user/main/home/Home";


let routes= createBrowserRouter([
    {
        path:"/register",
        element:<Register></Register>
    },
    {
     path:"/",
     element:<Login></Login>
    },
    {
        path:"/home",
        element:<Main></Main>,
        children:[
            {
                index:true,
                element: <Home></Home>
            },{
                path:"about",
                element:<About></About>
            },{
                path:"addBills",
                element:<Addbills></Addbills>
            },{
                path:"filter",
                element:<Filterbills></Filterbills>
            }
        ]
    }
])


export default routes