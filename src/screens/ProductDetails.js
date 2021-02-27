import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { commerce } from "../lib/commerce";

const ProductDetails = ({ match }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProduct(id) {
    try {
      const data = await commerce.products.retrieve(id);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  return loading ? (
    <Loader />
  ) : error ? (
    { error }
  ) : (
    <section className="product__details">
      <h2 className="product__details-title">Product {productId}</h2>
      <p
        dangerouslySetInnerHTML={{ __html: product.description }}
        className="product__details-text"
      ></p>
    </section>
  );
};

export default ProductDetails;
