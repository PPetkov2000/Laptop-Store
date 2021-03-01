import React from "react";
import Navigation from "./Navigation";

const Header = ({ cartItems }) => {
  return (
    <header className="header">
      <Navigation cartItems={cartItems} />
    </header>
  );
};

export default Header;
