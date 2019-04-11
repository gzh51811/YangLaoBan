import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//引入根字体js
import './assets/lib/rem.js';
import {Provider} from 'react-redux'
import store from './store'
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



//引入移动端base样式
// import './sass/base.scss';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
