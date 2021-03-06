import './index.css';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import Routes from './components/Routes.js'
import store from './store'

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)
