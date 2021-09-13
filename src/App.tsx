import { providers } from 'ethers';
import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { configureStore, history } from '@reduxConfig';
import RouterView from '@routes';
import theme from './theme';

import './App.scss';

const store = configureStore();

const getLibrary = (provider: any, connector: any) => {
  return new providers.Web3Provider(provider);
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
