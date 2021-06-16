import TopMenu from "components/ui/TopMenu";

import { makeStyles, Typography, Container } from '@material-ui/core';

const Copyright = ()=>(
  <Typography variant="body2" color="textSecondary">
    {'Copyright © '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    height: 'calc( 100vh - 64px - 92px)',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const DefaultLayout = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div className="layout" className={classes.root}>
      <TopMenu title={title}/>
      <main className={classes.main}>
        {children}
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">LOREN IPSUM</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}

export default DefaultLayout;
