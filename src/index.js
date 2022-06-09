/** 
 * FILE: Index.js
 * AUTHOR: Kaleb Chisholm
 * LAST MODIFIED: 06/09/2022
 * 
 * PURPOSE: main.
*/

// ------------------------------- IMPORTS ------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { myTheme } from './styles/Theme'

// -------------------------------- RENDER ------------------------------------
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={myTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
