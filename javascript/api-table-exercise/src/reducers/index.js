import { combineReducers } from 'redux';
import * as apiReducers from './api'

export default combineReducers({
  ...apiReducers
})
  