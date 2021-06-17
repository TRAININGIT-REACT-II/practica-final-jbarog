import { useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";

import {IconButton, Grid, Paper, makeStyles} from '@material-ui/core';

import AuthForm from "components/ui/AuthForm";
import DefaultLayout from "components/Layouts/DefaultLayout";
import Auth from "contexts/auth";

const MOCK_USER = {
  id: 1,
  name: "john"
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AuthLayout = ({title,onSubmit,info,setInfo,children,isLoading}) => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(Auth);
  const handleClose = (event) => {
    setInfo(false);
  };
  return (
    auth.currentUser ? (
      <Redirect
        to={{
          pathname: "/notes",
          state: { msg: "You are already logged" },
        }}
      />
    ):(
      <DefaultLayout title={title} alertContent={info} alertOnClose={setInfo}>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image}/>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <AuthForm onSubmit={onSubmit} isLoading={isLoading}></AuthForm>
              {children}
            </div>
          </Grid>
        </Grid>
      </DefaultLayout>
    )
  );
};

export default AuthLayout;
