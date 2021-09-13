import { ConnectedRouter } from 'connected-react-router';
import { Web3Provider } from '@ethersproject/providers';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { configureStore, history } from '@reduxConfig';
import RouterView from '@routes';
import theme from './theme';

import './App.scss';

const store = configureStore();

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <RouterView />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
