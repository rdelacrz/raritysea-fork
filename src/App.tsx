import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxConfig';

import './App.scss';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      App
    </Provider>
  );
}

export default App;
