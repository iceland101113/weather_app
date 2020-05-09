import React from "react";
import TodoInput from "./components/todos/TodoInput";
import TodoList from "./components/todos/TodoList";
import Init from "./components/initpage/init";
import { UserForm } from "./components/userform/UserForm";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Init />
      <TodoInput />
      <TodoList />
      <UserForm />
    </div>
  );
}

export default App;
