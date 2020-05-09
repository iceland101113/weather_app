import React from "react";
import sharinProto from "../../sharingan.svg";
import logo from "../../sharingan_kakashi.svg";
import madara from "../../sharingan_madara.svg";
import sharingan from "../../sharingan_triple.svg";

function Init() {
  return (
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
  );
}

export default Init;
