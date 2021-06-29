import { useEffect, useState } from "react";
import { Route, NavLink, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Typography, IconButton, CardMedia, CircularProgress, Container, CardContent, CardActions, Card, Grid, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import LoggedLayout from "components/Layouts/LoggedLayout";
import { getNotes } from "selectors/notes";
import { setNotes } from "actions/notes";
import useApi from "hooks/useApi";
import NoteDetail from "components/ui/NoteDetail";
import NoteEdit from "components/ui/NoteEdit";
import DeleteConfirm from "components/ui/DeleteConfirm";


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardText: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden"
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between"
  },
}));

const ListNotes = ({ status }) => {
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

  const headerAction = ()=>{
    history.push("/notes/create");
  }

  return (
    <LoggedLayout title="Notes" clickAdd={headerAction}>
      <Route path={`${match.url}`}>
        <Container className={classes.cardGrid} maxWidth="md">
          {
            listRequest.loading?<CircularProgress />:<Grid container spacing={4}>
                {notes.map((card,index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                        <Typography className={classes.cardText}>
                          {card.content}
                        </Typography>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <IconButton component={NavLink} to={`${match.url}/view/${card.id}`}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton component={NavLink} to={`${match.url}/edit/${card.id}`}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={showDeleteConfirm(card.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
