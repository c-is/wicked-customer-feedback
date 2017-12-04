import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import Home from './home';

import jsonData from '../data/data.json';

const container = document.getElementById('container');

function renderComponent() {
  ReactDOM.render(
    <div className="app">
      <Home data={jsonData} />
    </div>
  , container,
  );
}

// if (process.env.NODE_ENV !== 'development' && window.ga) {
//   window.ga('send', 'pageview', location.pathname);
// }

function render() {
  renderComponent();
}

render();
FastClick.attach(document.body);

