import { useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Button, CardMedia, CircularProgress, Container, CardContent, CardActions, Card, Grid, makeStyles } from '@material-ui/core';

import LoggedLayout from "components/Layouts/LoggedLayout";
import {getNotes} from "selectors/notes";
import { createNote, setNotes } from "actions/notes";
import useApi from "hooks/useApi";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ListNotes = ({ status }) => {
  const notes = useSelector((state) => getNotes(state));
  const classes = useStyles();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const listRequest = useApi('getNotes',{})
  const addNoteRequest = useApi('addNote',{})
  useEffect(() => {
    listRequest.perform();
  },[]);
  useEffect(() => {
    dispatch(setNotes(listRequest.data || []));
  },[listRequest.data]);
  useEffect(() => {
    dispatch(createNote(addNoteRequest.data));
  },[addNoteRequest.data]);
  const addNote = ()=>{
    const formData= {
     "title": "Título de la nota",
     "content": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere nisi eget erat commodo, id eleifend velit congue. Curabitur id sodales arcu. Morbi semper condimentum massa, non vulputate elit varius sit amet. Duis nunc lectus, ultricies non commodo cursus, rhoncus in turpis. Nunc ut vestibulum libero. Suspendisse finibus sit amet justo vel sollicitudin. Nunc eu tortor sit amet dolor tempor malesuada ac sed dui. Quisque et metus id mauris posuere sagittis ut ut nisi.

Vivamus congue elit mattis nisi tincidunt rhoncus. Nullam eget laoreet odio, vel interdum quam. Duis imperdiet semper ligula, et aliquet ante. Ut placerat placerat tortor at bibendum. Nam iaculis, nibh vel posuere imperdiet, sem tortor iaculis ligula, ut ultrices justo nisl vitae velit. Vestibulum sit amet mattis felis. Curabitur vulputate odio sit amet risus tempus molestie. Donec luctus, sem sit amet aliquet accumsan, eros arcu vehicula diam, vitae tristique nunc neque hendrerit lacus. Integer egestas sit amet mi eu sollicitudin. Sed eu odio vehicula, tristique eros id, blandit erat. Nulla et odio volutpat, lobortis lorem ut, egestas orci.
`,
    }
    addNoteRequest.perform(formData);
  }

  return (
    <LoggedLayout title="Notes" clickAdd={addNote}>
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
                      <CardActions>
                        <Button component={NavLink} to={`${match.url}/view/1`} size="small" color="primary">
                          View
                        </Button>
                        <Button component={NavLink} to={`${match.url}/edit/1`} size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          }

        </Container>
      </Route>
      <Route path={`${match.url}/view/:id`}>
        <div style={{width:200,height:200,transform:"translate(-50%)",padding: "10px",border:"1px solid",background:"white",position:'absolute',top:'50%',left:'50%'}}>note detail</div>
      </Route>
      <Route path={`${match.url}/edit/:id`}>
        <div style={{width:200,height:200,transform:"translate(-50%)",padding: "10px",border:"1px solid",background:"white",position:'absolute',top:'50%',left:'50%'}}>note edit</div>
      </Route>
    </LoggedLayout>
  );
};

export default ListNotes;
