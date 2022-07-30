import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const url = new URL(window.location.href);
if (url.protocol !== 'https:') {
  window.location.replace(url.href.replace('http://', 'https://'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
