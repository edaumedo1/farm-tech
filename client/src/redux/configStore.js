import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import PromiseMiddleware from "redux-promise";
import user from "./modules/user";

const middlewares = [thunk, PromiseMiddleware];

const env = process.env.NODE_ENV;
if(env === "development"){
  const {logger} = require("redux-logger");
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const rootReducer = combineReducers({
  user,
});
const configureStore = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

export default configureStore;
