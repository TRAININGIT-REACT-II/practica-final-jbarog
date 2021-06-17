import { useState } from "react";

import AuthLayout from "components/Layouts/AuthLayout";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const doLogin = formData=>{
    setIsLoading(true);
    fetch("/api/login",{
      method:"post",
      body:JSON.stringify(formData),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => res.json())
      .then((authData) => {
        setIsLoading(false);
        if(authData.error){
          createError(authData.error);
        } else {
          //auth.updateAuth(authData);
        }
      })
      .catch(err => {
        createError(err);
        console.error(err)
      });
  }
  const createError = message =>{
    setInfo({
      message,
      type:'error'
    });
  }
  return (
    <AuthLayout title="Login" onSubmit={doLogin} isLoading={isLoading} info={info} setInfo={setInfo}>
      <NavLink to="/join">You need an account?</NavLink>
    </AuthLayout>
  );
};

export default Login;
