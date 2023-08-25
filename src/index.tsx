import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./Header";
import App from "./App";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

const header = ReactDOM.createRoot(
  document.getElementById("header") as HTMLElement
);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

header.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
