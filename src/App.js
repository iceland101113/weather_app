import React from "react";
import logo from "./sharingan_kakashi.svg";
import madara from "./sharingan_madara.svg";
import sharingan from "./sharingan_triple.svg";
import sharinProto from "./sharingan.svg";
import TodoInput from "./components/todos/TodoInput";
import TodoList from "./components/todos/TodoList";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={madara} className="App-logo" alt="logo" />
        <img src={sharingan} className="App-logo" alt="logo" />
        <img src={sharinProto} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
