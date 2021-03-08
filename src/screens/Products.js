import React from "react";
import Product from "../components/Product";

const Products = ({ products, handleAddToCart }) => {
  return (
    <section className="products">
      <div className="content-wrapper">
        <h1 className="products__title">Products</h1>

        <article className="products__wrapper">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              addToCart={() => handleAddToCart(product.id, 1)}
            />
          ))}
        </article>
      </div>
    </section>
  );
};

export default Products;
