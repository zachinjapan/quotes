import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// redux stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducerFunc from "./Redux/reducers";

const store = createStore(reducerFunc);

const incrementAction = {
  type: "INCREMENT",
};
const resetAction = {
  type: "Rest",
};
export default {
  incrementAction,
  resetAction,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
