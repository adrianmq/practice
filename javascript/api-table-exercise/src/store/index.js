import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';

const makeStore = () => {
    return createStore(reducer, {}, applyMiddleware(thunk, logger));
}

export default makeStore;