import * as React from "react";
import { render } from "react-dom";
import Wizard from './Wizard';

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Wizard />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
