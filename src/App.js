import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Checkout from "./components/Checkout";
import { commerce } from "./lib/commerce";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await commerce.cart.retrieve();
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.update(productId, { quantity });
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <Header cartItems={cart && cart.total_items} />
      <main>
        <Switch>
          <Route path="/" exact>
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>
          <Route path="/products/:id" exact>
            <ProductDetails />
          </Route>
          <Route path="/cart" exact>
            <Cart
              cart={cart}
              handleRemoveItem={handleRemoveItem}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
