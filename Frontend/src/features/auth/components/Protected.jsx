import { Navigate } from "react-router-dom";
// import { selectLoggedInUser } from "../authSlice"
import { useSelector } from "react-redux";
import { selectloggedInUser } from "../authSlice";

function Protected({children}) {    // childeren are like: <Home/>, <Checkout/>, <CartPage/> etc.
    const user = useSelector(selectloggedInUser);
    if(!user){
        return <Navigate to="/login" ></Navigate>
    }
    return children
 
}

export default Protected