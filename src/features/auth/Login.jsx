// import  React,{ useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount } from "./authSlice";

export default function Login() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div></div>
    </div>
  );
}
