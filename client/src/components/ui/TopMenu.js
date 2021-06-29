import React from 'react';
import { useContext } from "react";

import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Fab, makeStyles } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import SwitchComponent from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/Add';

import Auth from "contexts/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

const TopMenu = ({title, clickAdd:clickAddCallBack, onChangeDarkMode}) => {
  const auth = useContext(Auth);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logOut = () => {
    auth.updateAuth(null);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const clickAdd = () =>{
    clickAddCallBack()
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            onChangeDarkMode?<SwitchComponent
              onChange={onChangeDarkMode}
              color="primary"
            />:<></>
          }
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {auth.currentUser && (<>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={clickAdd}>
              <AddIcon htmlColor="#fff" />
            </Fab>
            <div>
              {auth.currentUser.name}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
          </>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopMenu
