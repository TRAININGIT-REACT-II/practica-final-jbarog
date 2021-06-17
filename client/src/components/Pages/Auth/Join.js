import { useState } from "react";

import AuthLayout from "components/Layouts/AuthLayout";
import { NavLink } from "react-router-dom";

const Join = ({ status }) => {
  const [info, setInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const doRegister = formData=>{
    setIsLoading(true);
    fetch("/api/register",{
      method:"post",
      body:JSON.stringify(formData),
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((res) => res.json())
      .then((authData) => {
        setIsLoading(false);
        if(authData.error) {
          createError(authData.error);
        }
        console.log('authData',authData);
        //auth.updateAuth(authData);
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
    <AuthLayout title="Join" onSubmit={doRegister} isLoading={isLoading} info={info} setInfo={setInfo}>
      <NavLink to="/login">You already have an account?</NavLink>
    </AuthLayout>
  );
};

export default Join;
