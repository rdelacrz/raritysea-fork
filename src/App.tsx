import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Page } from '@layouts';
import { configureStore } from '@reduxConfig';
import theme from './theme';

import './App.scss';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Page>
          App
        </Page>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
