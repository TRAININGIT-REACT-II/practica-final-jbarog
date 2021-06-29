import { Route, NavLink, useHistory } from "react-router-dom";

import { Typography, IconButton, CardMedia, CardContent, CardActions, Card, Grid, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
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

const NoteCard = ({note, path, onDelete}) => {
  const classes = useStyles();

  const handleClose = (event) => {
    onClose(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {note.title}
          </Typography>
          <Typography className={classes.cardText}>
            {note.content}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <IconButton component={NavLink} to={`${path}/view/${note.id}`}>
            <VisibilityIcon />
          </IconButton>
          <IconButton component={NavLink} to={`${path}/edit/${note.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete(note.id)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default NoteCard;
