import { Route, NavLink, useHistory } from "react-router-dom";

import { Typography, IconButton, ListItem, ListItemText, ListItemSecondaryAction, Grid, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  listItem: {
    borderBottom: '1px solid #e0e0e0'
  },
  li: {
    listStyle: 'none'
  },
  ellipsis: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  actions: {
    top: '7px',
    right: 0
  },
}));

const NoteRow = ({note, path, onDelete}) => {
  const classes = useStyles();

  const handleClose = (event) => {
    onClose(false);
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <ListItem   classes={{
        root: classes.listItem,
        container: classes.li,
      }}>
        <ListItemText
          primary={note.title}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={classes.ellipsis}
              color="textPrimary"
            >{note.content}</Typography>
          }
        />
        <ListItemSecondaryAction className={classes.actions}>
          <IconButton component={NavLink} to={`${path}/view/${note.id}`}>
            <VisibilityIcon />
          </IconButton>
          <IconButton component={NavLink} to={`${path}/edit/${note.id}`}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete(note.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default NoteRow;
