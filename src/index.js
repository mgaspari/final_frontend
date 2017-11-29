import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import manageUsers from "./reducers/manageUsers"
import manageDeals from "./reducers/manageDeals"
import manageMenus from "./reducers/manageMenus"
const rootReducer = combineReducers({manageUsers, manageDeals, manageMenus})
// export const configureStore = () => {
//   return createStore(manageUsers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
// }
//
// const store = configureStore();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
