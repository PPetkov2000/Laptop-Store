import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/products/:id" exact component={ProductDetails} />
          <Route path="/cart" exact component={Cart} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
