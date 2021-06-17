import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = ({content, onClose}) => {
  const handleClose = (event) => {
    onClose(false);
  };
  return (
    <Snackbar open={Boolean(content)} autoHideDuration={4000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={content.type}>{content.message}</MuiAlert>
    </Snackbar>
  );
};

export default Alert;
