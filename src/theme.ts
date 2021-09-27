import { createTheme } from '@material-ui/core';
import { inherits } from 'util';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#F5F5F5',
    },
  },
  overrides: {
    // Header elements
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#6E7D85',
      },
    },

    // Clickable elements
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

    // Cards
    MuiCard: {
      root: {
        backgroundColor: '#EEEEEE',
      },
    },

    // Tabs
    MuiTabs: {
      root: {
        backgroundColor: '#6e7d85',
      },
    },
    MuiTab: {
      root: {
        color: 'white',
        textTransform: 'capitalize',
      },
    },

    MuiBackdrop: {
      root: {
        zIndex: 5000,
      },
    },

    // Inputs
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
      input: {
        padding: '10.5px 14px',
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
