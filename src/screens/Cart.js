import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveItem,
  handleEmptyCart,
}) => {
  const cartIsEmpty = cart.line_items.length === 0;

  return (
    <section className="cart">
      <div className="content-wrapper">
        <h1 className="cart__title">Your Cart</h1>
        {cartIsEmpty && <h2 style={{ textAlign: "center" }}>No items</h2>}
        <div className="cart__content">
          <article className="cart__items">
            {cart.line_items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItem={() => handleRemoveItem(item.id)}
              />
            ))}
          </article>
          {!cartIsEmpty && (
            <article className="cart__summary">
              <h2 className="cart__summary-title">Summary</h2>
              <p className="cart__summary-text">
                Subtotal <span>{cart.subtotal.formatted_with_symbol}</span>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
