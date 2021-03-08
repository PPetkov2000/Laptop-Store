import React from "react";

const CartItem = ({ item, removeItem }) => {
  return (
    <div className="item__card">
      <img
        src={item.media.source}
        alt={item.name}
        className="item__card-image"
      />
      <p className="item__card-text">{item.product_name}</p>
      <p className="item__card-text">{item.price.formatted_with_symbol}</p>
      <i
        className="fa fa-trash icon-red item__card-delete-icon"
        onClick={removeItem}
      ></i>
    </div>
  );
};

export default CartItem;
