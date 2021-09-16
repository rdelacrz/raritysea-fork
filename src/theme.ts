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
        border: 'solid 1px hsla(0, 0%, 100%, .3)',
        color: 'white',
        transition: 'all 100ms ease-in-out',
        '&:hover': {
          background: 'hsla(0, 0%, 100%, .15)',
          border: 'solid 1px hsla(0, 0%, 100%, .7)',
        },
      },
    },
    MuiSelect: {
      root: {
      },
      icon: {
        color: 'white',
      },
    },
  },
});

export default theme;
