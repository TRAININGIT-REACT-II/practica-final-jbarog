import { Route, NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Typography, Button, CardMedia, Container, CardContent, CardActions, Card, Grid, makeStyles } from '@material-ui/core';

import LoggedLayout from "components/Layouts/LoggedLayout";
import {getNotes} from "selectors/notes";
import { createNote } from "actions/notes";

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

  const addNote = ()=>{
    dispatch(createNote('1'));
    console.log("thing doned",notes);
  }

  return (
    <LoggedLayout title="Notes" clickAdd={addNote}>
      <Route path={`${match.url}`}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {notes.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
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
