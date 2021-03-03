import React from "react";

const OrderReview = ({ checkoutToken }) => {
  return (
    <article className="order-review">
      <h3 className="order-review__title">Order Summary</h3>
      {checkoutToken.live.line_items.map((product) => (
        <div key={product.id} className="order-review__product">
          <h4 className="order-review__product-name">{product.name}</h4>
          <h4 className="order-review__product-price">
            {product.line_total.formatted_with_symbol}
          </h4>
        </div>
      ))}
      <div className="order-review__total">
        <h4>Total</h4>
        <h4>{checkoutToken.live.subtotal.formatted_with_symbol}</h4>
      </div>
    </article>
  );
};

export default OrderReview;
