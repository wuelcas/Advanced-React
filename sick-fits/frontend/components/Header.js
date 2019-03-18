import React from "react";
import Nav from "./Nav";

export default function Header() {
  return (
    <div>
      <div className="bar">
        <a href="">Sick Fits</a>
        <Nav />
      </div>
      <div className="sub-bar">Search</div>
      <div>Cart</div>
    </div>
  );
}
