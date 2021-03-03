import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Confirmation = ({ order, error }) => {
  return !order.customer ? (
    <Loader />
  ) : error ? (
    <div className="confirmation">
      <h5 className="confirmation__error">{error}</h5>
      <Link to="/" className="confirmation__link">
        Back to home
      </Link>
    </div>
  ) : (
    <div className="confirmation">
      <h5 className="confirmation__title">
        Thank you for your purchase, {order.customer.firstname}{" "}
        {order.customer.lastname}
      </h5>
      <p className="confirmation__text">
        Order ref: {order.customer_reference}
      </p>
      <Link to="/" className="confirmation__link">
        Back to home
      </Link>
    </div>
  );
};

export default Confirmation;
