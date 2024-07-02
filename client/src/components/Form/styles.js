import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '40px',
    backgroundImage: 'linear-gradient(to top, #6DD5FA 0%,#ffffff 60%,#ffffff 100%)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // Updated to column layout
    alignItems: 'center', // Center align items
    gap: theme.spacing(2), // Add gap between form elements
  },
  fileInput: {
    width: '100%', // Adjusted width to 100%
    margin: theme.spacing(2, 0), // Updated margin
  },
  buttonSubmit: {
    borderRadius: '40px',
  },
  buttonClear: {
    borderRadius: '40px',
  },
}));
