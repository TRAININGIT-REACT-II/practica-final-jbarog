import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";


import { Modal, IconButton, Button, Typography, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useApi from "hooks/useApi";
import { removeNote } from "actions/notes";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: '25px',
    position: 'absolute',
    width: 400,
    top: '50%',
    left: '50%',
    background: '#000000aa',
    transform: 'translate(-50%, -50%)',
  },
  text:{
    color: 'white',
    margin: '10px 0'
  },
  buttons: {
    display:'flex',
    justifyContent: 'space-between'
  }
}));

const DeleteConfirm = ({ noteId, onClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const confirmRef = useRef(null);
  const confirmGroupRef = useRef(document.getElementById("confirms"));
  const deleteRequest = useApi('deleteNote',{})

  const onConfirm = ()=>{
    deleteRequest.perform({noteId:noteId})
  }

  useEffect(() => {
    if(deleteRequest.data) {
      dispatch(removeNote(noteId));
      onClose();
    }
  },[deleteRequest.data]);

  useEffect(() => {
    const confirmEl = document.createElement("div");
    confirmEl.classList.add("confirm-hidden");
    confirmGroupRef.current.appendChild(confirmEl);
    confirmRef.current = confirmEl;
    return () => confirmGroupRef.current.removeChild(confirmRef.current);
  }, [])

  useEffect(() => {
    if (confirmRef.current != null) {
      if (noteId) {
        confirmRef.current.classList.remove("confirm-hidden");
      } else {
        confirmRef.current.classList.add("confirm-hidden");
      }
    }
  }, [noteId])

  if (noteId && confirmRef.current != null) {
    return createPortal(
      <Modal
        open={true}
      >
        <div className={classes.box}>
          <Typography variant="h6" color="textSecondary" className={classes.text}>
            Note will be removed
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.text}>
            Are you sure?
          </Typography>
          <div className={classes.buttons}>
            <Button
            variant="contained"
            color="secondary"
            onClick={onClose}
            >
            Cancel
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            >
            Confirm
            </Button>
          </div>
        </div>
      </Modal>,
      confirmRef.current
    );
  } else {
    return null;
  }
};

export default DeleteConfirm;
