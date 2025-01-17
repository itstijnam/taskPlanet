import React from "react";
import "../../style/LeftSideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setAuthAdmin } from "../../store/authSlice";
import axios from "axios";

function LeftSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {admin} = useSelector((store)=> store.auth)

  const logoutHandler = async ()=>{
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/admin/logout`, {withCredentials:true})
      if(res.data.success){
        dispatch(setAuthAdmin(null));
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="leftSideBar h-screen overflow-hidden">
      <h1 className="font-bold LFTADMNnameDis py-8">Admin Dashboard</h1>
      <div className="managerTaskList h-screen">
        <div className="singleNavitem">
            <div className="singleNavLink flex flex-col">
                <div className="font-bold" >Admin</div>
                <div className="text-gray-800 pl-2">{admin.username} </div>
                <div className="text-gray-800 pl-2">{admin.email} </div>
            </div>
        </div>
      <div 
      className="text-white p-2 bg-slate-900 m-2 rounded-xl flex justify-center items-center hover:text-red-500 cursor-pointer"
      onClick={logoutHandler}
      > Logout </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
