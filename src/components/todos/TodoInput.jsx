import React, { Component } from "react";
// import Icon from "./SharinIcon";

class TodoInput extends Component {
  state = {};
  render() {
    return (
      <div className="container card card-body my-3">
        <form action="#">
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <div className="input-group-text bg-primary text-white">
              {/* <Icon width={20} fill="#1f5" /> */}
              <i className="fa fa-book" />
            </div>
            <input
              type="text"
              className="form-control text-capitalize"
              placeholder="add an item"
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button>
        </form>
      </div>
    );
  }
}

export default TodoInput;
