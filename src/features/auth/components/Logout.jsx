import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


function Logout() {
    const dispatch =useDispatch();
    const user = useSelector(selectLoggedInUser);
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