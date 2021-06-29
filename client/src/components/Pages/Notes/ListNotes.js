import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { Typography, IconButton, CircularProgress, Container, Grid, makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import ReorderIcon from '@material-ui/icons/Reorder';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

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

const ORDER_TYPES = {
  date: 'date',
  title: 'title'
}

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  changeListType: {
    float: 'right',
  },
  changeOrderType: {
    float: 'left',
  },
}));

const ListNotes = ({ onChangeDarkMode }) => {
  const [listType, setListType] = useState(LIST_TYPES.box);
  const [orderType, setOrderType] = useState(ORDER_TYPES.date);
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

  const changeOrderType = (e,value)=>{
    setOrderType(value);
  }

  const headerAction = ()=>{
    history.push("/notes/create");
  }

  const orderByDate = (a,b)=>{
    return 1;
  }

  const orderByTitle = (x,y)=>{
    if (x.title < y.title) return -1;
    if (x.title > y.title) return 1;
    return 0;
  }

  return (
    <LoggedLayout title="Notes" clickAdd={headerAction} onChangeDarkMode={onChangeDarkMode}>
      <Route path={`${match.url}`}>
        <Container className={classes.cardGrid} maxWidth="md">
          {
            listRequest.loading?<CircularProgress />:
            <>
              <ToggleButtonGroup
                className={classes.changeOrderType}
                size="small"
                color="primary"
                value={orderType}
                exclusive
                onChange={changeOrderType}
                disabled={!notes || !notes.length}
              >
                <ToggleButton value={ORDER_TYPES.date}><CalendarTodayIcon/></ToggleButton>
                <ToggleButton value={ORDER_TYPES.title}><SortByAlphaIcon/></ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                className={classes.changeListType}
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
                  {[].concat(notes).sort(orderType==ORDER_TYPES.date?orderByDate:orderByTitle).map((card,index) => (
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
