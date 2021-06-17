import { makeStyles, Typography, Container } from '@material-ui/core';

import Alert from "components/ui/Alert";
import Footer from "components/ui/Footer";
import TopMenu from "components/ui/TopMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    height: 'calc( 100vh - 64px - 92px)',
  },
}));

const DefaultLayout = ({ title, children, alertContent, alertOnClose }) => {
  const classes = useStyles();
  return (
    <div className="layout" className={classes.root}>
      <TopMenu title={title}/>
      <main className={classes.main}>
        {children}
      </main>
      <Footer/>
      <Alert content={alertContent} onClose={alertOnClose}/>
    </div>
  )
}

export default DefaultLayout;
