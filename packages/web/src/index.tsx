import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { ThemeProvider } from 'styled-components';
import * as Themeing from 'Theme';
import * as serviceWorker from 'serviceWorker';
import { SocketProvider } from 'context/SocketContext';

ReactDOM.render(
  <ThemeProvider theme={Themeing.theme}>
    <Themeing.GlobalStyle />
    <SocketProvider>
      <App />
    </SocketProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
