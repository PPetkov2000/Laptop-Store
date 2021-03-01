import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = ({ cart, handleRemoveItem, handleEmptyCart }) => {
  return (
    <section className="cart">
      <h1 className="cart__title">Your Cart</h1>
      <div className="cart__content">
        {cart.line_items.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>No items</h2>
        ) : (
          <>
            <article className="cart__items">
              {cart.line_items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeItem={() => handleRemoveItem(item.id)}
                />
              ))}
            </article>
            <article className="cart__summary">
              <h2 className="cart__summary-title">Summary</h2>
              <p className="cart__summary-text">
                Subtotal <span>{cart.subtotal.formatted_with_symbol}</span>
              </p>
              <p className="cart__summary-text">
                Total <span>$1000.00</span>
              </p>
              <div className="cart__summary-actions">
                <button
                  className="cart__summary-clear-cart-button button-red"
                  onClick={handleEmptyCart}
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="cart__summary-checkout-button button-secondary"
                >
                  Checkout
                </Link>
              </div>
            </article>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
