import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AuthLayout from "components/Layouts/AuthLayout";
import useApi from "hooks/useApi";

const Join = ({ status }) => {
  const [info, setInfo] = useState(false);
  const joinRequest = useApi('register',{})
  const doRegister = formData=>{
    joinRequest.perform(formData)
  }
  useEffect(() => {
    createError(joinRequest.error)
    return createError
  },[joinRequest.error]);
  const createError = message =>{
    setInfo(message?{
      message,
      type:'error'
    }:false);
  }
  return (
    <AuthLayout title="Join" onSubmit={doRegister} isLoading={joinRequest.loading} info={info} setInfo={setInfo}>
      <NavLink to="/login">You already have an account?</NavLink>
    </AuthLayout>
  );
};

export default Join;
