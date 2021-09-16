import { createTheme } from '@material-ui/core';
import { inherits } from 'util';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
    secondary: {
      main: '#F5F5F5',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '0.875rem',
        textTransform: 'capitalize',
      },
      containedSecondary: {
        '&$disabled': {
          backgroundColor: '#F5F5F5',
        },
      },
    },
    MuiLink: {
      root: {
        color: '#29b6f6',
      },
    },
    MuiOutlinedInput: {
      root: {
        background: 'hsla(0,0%,100%,.08)',
        color: 'white',
      },
      notchedOutline: {
        borderColor: 'hsla(0, 0%, 100%, .3)',
      },
    },
    MuiSelect: {
      icon: {
        color: 'white',
      },
    },
  },
});

export default theme;
