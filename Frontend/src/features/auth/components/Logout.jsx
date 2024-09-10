import { useDispatch, useSelector } from "react-redux"
import { selectloggedInUser, signOutAsync } from "../authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


function Logout() {
    const dispatch =useDispatch();
    const user = useSelector(selectloggedInUser);
    useEffect(()=>{
       dispatch(signOutAsync())
    },[])
  return (
    <div>
        {user && <Navigate to={"/login"} replace={true}></Navigate>}
    </div>
  )
}

export default Logout