import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  state = {};
  render() {
    return (
      <ul className="container list-group my-5">
        <h3 className="text-center text-capitalize">todo list</h3>
        <TodoItem />
        <button
          type="button"
          className="btn btn-danger btn-block text-capitalize mt-3"
        >
          clear list
        </button>
      </ul>
    );
  }
}

export default TodoList;
