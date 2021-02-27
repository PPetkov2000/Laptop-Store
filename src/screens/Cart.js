import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import Loader from "../components/Loader";
import { commerce } from "../lib/commerce";

const Cart = () => {
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCart() {
    try {
      const data = await commerce.cart.retrieve();
      setCart(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <section className="cart">
      <h1 className="cart__title">Your Cart</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <article className="cart__wrapper">
          {cart.line_items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </article>
      )}
    </section>
  );
};

export default Cart;
