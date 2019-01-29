import React from 'react';
import ReactDom from 'react-dom';
import { App } from './app';

const root = document.getElementById('root');

const render = () => {
  ReactDom.render(<App />, root);
};

if (module.hot) {
  module.hot.accept('./app', render);
}

render();
