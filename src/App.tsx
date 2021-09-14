import { Web3Provider } from '@ethersproject/providers';
import { MuiThemeProvider } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import RouterView from '@routes';
import theme from './theme';

import './App.scss';

const queryClient = new QueryClient();

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <RouterView />
          </BrowserRouter>
        </MuiThemeProvider>
      </Web3ReactProvider>
    </QueryClientProvider>
  );
}

export default App;
