import { useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import { CircularProgress, Avatar, Tooltip, Typography, makeStyles } from '@material-ui/core';

import SimpleModal from "components/ui/SimpleModal";
import useApi from "hooks/useApi";

const useStyles = makeStyles((theme) => ({
  avatar: {
    float: 'left',
    marginRight: '10px'
  },
}));

const NoteDetail = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const noteRequest = useApi('getNote',{})
  useEffect(() => {
    noteRequest.perform({noteId:params.noteId});
  },[params.noteId]);
  const modalClose = ()=>{
    history.push("/notes");
  }

  const setTitle = note => {
    return note?(<><Tooltip title={note.author.username} placement="right-end">
      <Avatar className={classes.avatar}>{note.author.username[0]}</Avatar>
    </Tooltip> {note.title}</>):(<></>)
  }
  return (
    <SimpleModal open={true} onClose={modalClose} title={setTitle(noteRequest.data)}>
      {
        (noteRequest.loading || !noteRequest.data)?<CircularProgress />:<>
          <Typography variant="body1">
            {noteRequest.data.content}
          </Typography>
        </>
      }
    </SimpleModal>
  );
};

export default NoteDetail;
