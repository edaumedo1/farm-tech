import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/configStore";
import App from "./common/App";
import "./index.css";

ReactDOM.render(
  <Provider
    store={configureStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
); //변경할 일 없음
