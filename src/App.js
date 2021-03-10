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
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const data = await commerce.cart.retrieve();
    setCart(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleRemoveItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.error.message);
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
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveItem={handleRemoveItem}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path="/checkout" exact>
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
              emptyCart={handleEmptyCart}
            />
          </Route>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
