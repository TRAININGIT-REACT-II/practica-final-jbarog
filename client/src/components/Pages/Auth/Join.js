import { useState } from "react";

import "./authForm/AuthForm";
import "components/Layouts/DefaultLayout";

const Join = ({ status }) => {
  return (
    <DefaultLayout title="Join">
      <AuthForm></AuthForm>
    </DefaultLayout>
  );
};

export default Join;
