import { useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CircularProgress, makeStyles } from '@material-ui/core';

import SimpleModal from "components/ui/SimpleModal";
import NoteForm from "components/ui/NoteForm";
import useApi from "hooks/useApi";
import { createNote, updateNote } from "actions/notes";
import { getNotes } from "selectors/notes";

const useStyles = makeStyles((theme) => ({

}));

const NoteEdit = () => {
  const notes = useSelector((state) => getNotes(state));
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const noteRequest = useApi('getNote',{})
  const addNoteRequest = useApi('addNote',{})
  const editNoteRequest = useApi('editNote',{})

  const modalClose = ()=>{
    history.push("/notes");
  }

  const onEdit = (formData)=>{
    editNoteRequest.perform({
      noteId:formData.id,
      title:formData.title,
      content:formData.content
    });
  }

  const onCreate = (formData)=>{
    addNoteRequest.perform(formData);
  }

  const onSave = (formData)=>{
    if(params.noteId){
      onEdit(formData)
    }else{
      onCreate(formData)
    }
  }

  useEffect(() => {
    params.noteId && noteRequest.perform({noteId:params.noteId});
  },[params.noteId]);

  useEffect(() => {
    if(addNoteRequest.data){
      dispatch(createNote(addNoteRequest.data));
      modalClose()
    }
  },[addNoteRequest.data]);

  useEffect(() => {
    if(editNoteRequest.data){
      dispatch(updateNote(editNoteRequest.data));
      modalClose()
    }
  },[editNoteRequest.data]);

  return (
    <SimpleModal open={true} onClose={modalClose} title={params.noteId?'Edit Note':'Create note'}>
      {
        (
          params.noteId && (noteRequest.loading || !noteRequest.data)
        )?<CircularProgress />:<NoteForm note={noteRequest.data} onSubmit={onSave}/>
      }
    </SimpleModal>
  );
};

export default NoteEdit;
