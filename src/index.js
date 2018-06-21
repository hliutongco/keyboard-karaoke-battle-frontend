import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk';
import Routes from './Routes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer)

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
