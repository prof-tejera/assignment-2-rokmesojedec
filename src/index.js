import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactTooltip from 'react-tooltip';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ReactTooltip place="bottom" type="info" effect="solid" delayShow={600} />
  </React.StrictMode>,
  document.getElementById('root')
);

