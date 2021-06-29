import { makeStyles, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

const Copyright = ()=>(
  <Typography variant="body2" color="textSecondary">
    {'Copyright © '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const Footer = ({title, clickAdd:clickAddCallBack}) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">LOREN IPSUM</Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

export default Footer
