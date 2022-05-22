import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { myTheme } from './styles/Theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={myTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
