import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './configureStore'
import { addProject } from './actions'
import { categories } from './constants'

const store = configureStore()

render(
  <Provider store={store}>
    <App categories={categories} />
  </Provider>,
  document.getElementById('app')
)
