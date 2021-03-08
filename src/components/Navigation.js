import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navigation = ({ cartItems }) => {
  const history = useHistory();

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__brand-link">
          Commerce
        </Link>
      </div>
      <i
        className="fas fa-shopping-cart navbar__cart-icon"
        onClick={() => history.push("/cart")}
      >
        {cartItems > 0 && (
          <div className="navbar__cart-icon-badge badge-red--rounded">
            {cartItems}
          </div>
        )}
      </i>
    </nav>
  );
};

export default Navigation;
