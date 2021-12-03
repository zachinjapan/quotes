import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux stuff
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducerFunc from "./Redux/reducers";

const store = createStore(reducerFunc);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
