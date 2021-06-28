import { Dialog,IconButton, Typography, makeStyles } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  modalClose: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}));

const SimpleModal = ({ open, onClose, children, title }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <MuiDialogTitle>
        {title}
        {onClose ? (
          <IconButton onClick={onClose} className={classes.modalClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        {children}
      </MuiDialogContent>
    </Dialog>
  );
};

export default SimpleModal;
