import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AuthLayout from "components/Layouts/AuthLayout";
import useApi from "hooks/useApi";

const Login = () => {
  const [info, setInfo] = useState(false);
  const loginRequest = useApi('login',{})
  const doLogin = formData=>{
    loginRequest.perform(formData)
  }
  useEffect(() => {
    createError(loginRequest.error)
    return createError
  },[loginRequest.error]);
  const createError = message =>{
    setInfo(message?{
      message,
      type:'error'
    }:false);
  }
  return (
    <AuthLayout title="Login" onSubmit={doLogin} isLoading={loginRequest.loading} info={info} setInfo={setInfo}>
      <NavLink to="/join">You need an account?</NavLink>
    </AuthLayout>
  );
};

export default Login;
