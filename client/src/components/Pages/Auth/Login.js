import AuthForm from "./authForm/AuthForm";
import DefaultLayout from "components/Layouts/DefaultLayout";

const Login = ({ status }) => {
  return (
    <DefaultLayout title="Login">
      <AuthForm ></AuthForm>
    </DefaultLayout>
  );
};

export default Login;
