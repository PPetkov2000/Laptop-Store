import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { commerce } from "../lib/commerce";

const Navigation = () => {
  const [cartItems, setCartItems] = useState(0);
  const history = useHistory();

  async function fetchCart() {
    try {
      const data = await commerce.cart.retrieve();
      setCartItems(data.total_items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img
          src="./images/app-logo.png"
          alt="logo"
          className="navbar__brand-logo"
        />
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
