import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
// wireframe -> https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C7d5648fe75e6ea905489e90fdc43d5e5/projects/M895313c521558953c1d57a8aaad9796b1599748501248/pages/afad87873baf4e3f861a6803c5be3acd/image/afad87873baf4e3f861a6803c5be3acd.png
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
