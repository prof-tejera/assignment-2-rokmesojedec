import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactTooltip from 'react-tooltip';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ReactTooltip />
  </React.StrictMode>,
  document.getElementById('root')
);

