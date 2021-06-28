import { useEffect, useState, useContext } from "react";

import { Box, Checkbox, FormControlLabel, TextField, Button, CircularProgress, makeStyles } from '@material-ui/core';

import { DEFAULT_AUTH_FORM_STATE, PASSWORD_MODES, AUTH_FORM_CONF } from "constants/authForm";
import Auth from "contexts/auth";
import {checkStringLength} from "utils/string.helpers";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loading: {
    'margin-left': 5,
  },
}));

const AuthForm = ({ onSubmit, isLoading }) => {
  const classes = useStyles();
  const [passwordMode, setPasswordMode] = useState(PASSWORD_MODES.password);
  const [formState, setFormState] = useState(DEFAULT_AUTH_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});

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
    const userNameError = checkFieldError('username');
    const passwordError = checkFieldError('password');
    return userNameError || passwordError?{
      userNameError,
      passwordError,
    }:null
  }

  const updateForm = field=>{
    return (event)=>{
      const newState = {
        ...formState,
        [field]: event.target.value
      }
      setFormState(newState);
      setFormErrors(checkFormErrors(newState));
    }
  };

  const sendForm = (event)=>{
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form className={classes.form}>
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="username"
      label="User name"
      name="username"
      autoComplete="username"
      value={formState.userName}
      onChange={updateForm('username')}
      error={Boolean(formErrors && formErrors.userNameError)}
      helperText={(formErrors && formErrors.userNameError)?'Name not valid':''}
      autoFocus
      />
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
      error={Boolean(formErrors && formErrors.passwordError)}
      helperText={(formErrors && formErrors.passwordError)?'Password not valid':''}
      />
      <FormControlLabel
      control={<Checkbox value="remember" color="primary"  onChange={togglePasswordMode}/>}
      label="Show password"
      />
      <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      disabled={Boolean(formErrors) || isLoading}
      className={classes.submit}
      onClick={sendForm}
      >
        Send {isLoading && <CircularProgress className={classes.loading} size={20}/>}
      </Button>
    </form>
  );
};

export default AuthForm;
