import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Product from "../components/Product";
import { commerce } from "../lib/commerce";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  }

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

  async function handleAddToCart(productId, quantity) {
    try {
      const data = await commerce.cart.add(productId, quantity);
      console.log(data);
      setCart(data.cart);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <section className="products">
      <h1 className="products__title">Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        { error }
      ) : (
        <article className="products__wrapper">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={() => handleAddToCart(product.id, 1)}
            />
          ))}
        </article>
      )}
    </section>
  );
};

export default Products;
