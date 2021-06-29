import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Typography, IconButton, CircularProgress, Container, Grid, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import ReorderIcon from '@material-ui/icons/Reorder';

import LoggedLayout from "components/Layouts/LoggedLayout";
import { getNotes } from "selectors/notes";
import { setNotes } from "actions/notes";
import useApi from "hooks/useApi";
import NoteDetail from "components/ui/NoteDetail";
import NoteEdit from "components/ui/NoteEdit";
import DeleteConfirm from "components/ui/DeleteConfirm";
import NoteCard from "components/ui/NoteCard";
import NoteRow from "components/ui/NoteRow";

const LIST_TYPES = {
  list: 'list',
  box: 'box'
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  changeType: {
    float: 'right',
  },
}));

const ListNotes = ({ status }) => {
  const [listType, setListType] = useState(LIST_TYPES.box);
  const [showConfirm, setShowConfirm] = useState(false);
  const history = useHistory();
  const notes = useSelector((state) => getNotes(state));
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const listRequest = useApi('getNotes',{})

  useEffect(() => {
    listRequest.perform();
  },[]);

  useEffect(() => {
    dispatch(setNotes(listRequest.data || []));
  },[listRequest.data]);

  const showDeleteConfirm = (id)=>()=>{
    setShowConfirm(id);
  }

  const hideDeleteConfirm = ()=>{
    setShowConfirm(false);
  }

  const changeListType = (e,value)=>{
    setListType(value);
  }

  const headerAction = ()=>{
    history.push("/notes/create");
  }

  return (
    <LoggedLayout title="Notes" clickAdd={headerAction}>
      <Route path={`${match.url}`}>
        <Container className={classes.cardGrid} maxWidth="md">
          {
            listRequest.loading?<CircularProgress />:
            <>
              <ToggleButtonGroup
                className={classes.changeType}
                size="small"
                color="primary"
                value={listType}
                exclusive
                onChange={changeListType}
                disabled={!notes || !notes.length}
              >
                <ToggleButton value={LIST_TYPES.box}><FeaturedPlayListIcon/></ToggleButton>
                <ToggleButton value={LIST_TYPES.list}><ReorderIcon/></ToggleButton>
              </ToggleButtonGroup>
              <Grid container spacing={4}>
                  {notes.map((card,index) => (
                    listType===LIST_TYPES.box?
                    <NoteCard note={card} key={index} path={match.url} onDelete={showDeleteConfirm}/>:
                    <NoteRow note={card} key={index} path={match.url} onDelete={showDeleteConfirm}/>
                  ))}
                </Grid>
              </>
          }

        </Container>
      </Route>
      <Route path={`${match.url}/view/:noteId`}>
        <NoteDetail/>
      </Route>
      <Route path={`${match.url}/edit/:noteId`}>
        <NoteEdit/>
      </Route>
      <Route path={`${match.url}/create`}>
        <NoteEdit/>
      </Route>
      <DeleteConfirm noteId={showConfirm} onClose={hideDeleteConfirm}/>
    </LoggedLayout>
  );
};

export default ListNotes;
