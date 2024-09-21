import { Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import { selectUserInfo } from "../../user/userSlice";
import { selectloggedInUser } from "../authSlice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectloggedInUser);
    const userInfo = useSelector(selectUserInfo);
    
    if(!user){
        return <Navigate to="/login" replace={"true"} ></Navigate>
    }
    if(user && user.role!=='admin'){
        return <Navigate to="/" replace={"true"} ></Navigate>
    }
    return children
 
}

export default ProtectedAdmin