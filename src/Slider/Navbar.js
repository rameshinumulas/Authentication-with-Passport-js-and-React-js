import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography,Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 6,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow:1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [islogOut, setislogOut] = React.useState(false)

  const HandleLogout =()=>{
      localStorage.removeItem("login email")
      setislogOut(true)
  } 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
          <Button color="inherit" onClick={HandleLogout}>Logout</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      {islogOut ? <Redirect to='/' /> :null}
    </div>
  );
}