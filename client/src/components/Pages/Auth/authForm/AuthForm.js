import { useEffect, useState, useContext } from "react";

import { Paper, Box, Grid, Checkbox, FormControlLabel, TextField, Button, makeStyles } from '@material-ui/core';
import { useHistory, Redirect } from "react-router-dom";

import { DEFAULT_AUTH_FORM_STATE, PASSWORD_MODES, AUTH_FORM_CONF } from "constants/authForm";
import Auth from "contexts/auth";
import {checkStringLength} from "utils/string.helpers";

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AuthForm = ({ status }) => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(Auth);
  const [passwordMode, setPasswordMode] = useState(PASSWORD_MODES.password);
  const [formState, setFormState] = useState(DEFAULT_AUTH_FORM_STATE);
  const [formErrors, setFormErrors] = useState(null);

  const togglePasswordMode = () => {
    const nextMode = passwordMode === PASSWORD_MODES.text?PASSWORD_MODES.password:PASSWORD_MODES.text;
    setPasswordMode(nextMode)
  };

  const checkFormErrors = form => {
    const checkFieldError = field=>!checkStringLength(
      form[field],
      AUTH_FORM_CONF[field].min,
      AUTH_FORM_CONF[field].max
    );
    const nameError = checkFieldError('name');
    const passwordError = checkFieldError('password');
    return nameError || passwordError?{
      nameError,
      passwordError,
    }:null
  }

  const updateForm = field=>{
    return (event)=>{
      setFormState({
        ...formState,
        [field]: event.target.value
      });
    }
  };

  const sendForm = (event)=>{
    event.preventDefault();
    auth.updateAuth(MOCK_USER);
    console.log(auth);
  };

  useEffect(() => {
    setFormErrors(checkFormErrors(formState));
  }, [formState]);

  return (
    auth.currentUser ? (
      <Redirect
        to={{
          pathname: "/notes",
          state: { msg: "You are already logged" },
        }}
      />
    ):(
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <form className={classes.form}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="email"
            autoComplete="name"
            value={formState.name}
            onChange={updateForm('name')}
            autoFocus
            />
            {(formErrors && formErrors.nameError)?<Box>Name not valid</Box>:<></>}
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={passwordMode}
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={updateForm('password')}
            />
            {(formErrors && formErrors.passwordError)?<Box>Password not valid</Box>:<></>}
            <FormControlLabel
            control={<Checkbox value="remember" color="primary"  onChange={togglePasswordMode}/>}
            label="Show password"
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={Boolean(formErrors)}
            className={classes.submit}
            onClick={sendForm}
            >
            Send
            </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    )
  );
};

export default AuthForm;
