import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '0.875rem',
        textTransform: 'capitalize',
      },
    },
    MuiLink: {
      root: {
        color: '#29b6f6',
      },
    },
  },
});

export default theme;
