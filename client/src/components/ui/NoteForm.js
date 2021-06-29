import { useEffect, useState, useContext } from "react";

import { TextField, Button, CircularProgress, makeStyles } from '@material-ui/core';

import { DEFAULT_NOTE_FORM_STATE, NOTE_FORM_CONF } from "constants/noteForm";
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

const NoteForm = ({ onSubmit, note }) => {
const isLoading = false;
  const classes = useStyles();
  const [formState, setFormState] = useState(note||DEFAULT_NOTE_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});

  const checkFormErrors = form => {
    const checkFieldError = field=>!checkStringLength(
      form[field],
      NOTE_FORM_CONF[field].min,
      NOTE_FORM_CONF[field].max
    );
    const titleError = checkFieldError('title');
    const contentError = checkFieldError('content');
    return titleError || contentError?{
      titleError,
      contentError,
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
        error={Boolean(formErrors && formErrors.titleError)}
        helperText={(formErrors && formErrors.titleError)?'Title not valid':''}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="noteTitle"
        label="Title"
        name="noteTitle"
        autoComplete="noteTitle"
        value={formState.title}
        onChange={updateForm('title')}
        autoFocus
      />
      <TextField
       error={Boolean(formErrors && formErrors.contentError)}
       helperText={(formErrors && formErrors.contentError)?'Content not valid':''}
       id="noteContent"
       label="Content"
       required
       multiline
       fullWidth
       rows={6}
       defaultValue={formState.content}
       onChange={updateForm('content')}
       variant="outlined"
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
        Send {isLoading && <CircularProgress className={classes.loading} size={20}/>}
      </Button>
    </form>
  );
};

export default NoteForm;
