import React from "react";

const CartItem = ({ item }) => {
  return (
    <div className="item__card">
      <img
        src={item.media.source}
        alt={item.name}
        className="item__card-image"
      />
      <p className="item__card-text">{item.product_name}</p>
      <p className="item__card-text">{item.price.formatted_with_symbol}</p>
      <i className="fa fa-trash"></i>
    </div>
  );
};

export default CartItem;
