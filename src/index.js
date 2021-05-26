import React from 'react'
import ReactDOM from 'react-dom'
import Index from './pages/Index'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import * as reducers from './redux/reducers'
import { history } from './utils/history'
import { StylesProvider } from '@material-ui/core/styles'
import './styles.css'

const { NODE_ENV } = process.env

let composeEnhancers
let middleware

if (NODE_ENV === 'production') {
  const loggerMiddleware = createLogger()
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  middleware = applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware,
   loggerMiddleware
  )
} else if (NODE_ENV === 'production') {
  composeEnhancers = compose

  middleware = applyMiddleware(
    routerMiddleware(history),
    thunkMiddleware
  )
}
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  ...reducers
})

const store = createStore(
  createRootReducer(history),
  composeEnhancers(middleware)
)

ReactDOM.render(

  <Provider store={store}>
    <StylesProvider injectFirst>
      <Index history={history} />
    </StylesProvider>
  </Provider>, document.getElementById('root'))
