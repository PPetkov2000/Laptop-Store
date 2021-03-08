import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Confirmation = ({ order, error, isFinished }) => {
  return isFinished ? (
    <div className="confirmation">
      <h4 className="confirmation__title">Thank you for your purchase</h4>
      <Link to="/" className="confirmation__link button-primary-darker">
        Back to home
      </Link>
    </div>
  ) : !order.customer ? (
    <Loader />
  ) : error ? (
    <div className="confirmation">
      <h4 className="confirmation__error">{error}</h4>
      <Link to="/" className="confirmation__link button-primary-darker">
        Back to home
      </Link>
    </div>
  ) : (
    <div className="confirmation">
      <h4 className="confirmation__title">
        Thank you for your purchase, {order.customer.firstname}{" "}
        {order.customer.lastname}
      </h4>
      <p className="confirmation__text">
        Order ref: {order.customer_reference}
      </p>
      <Link to="/" className="confirmation__link button-primary-darker">
        Back to home
      </Link>
    </div>
  );
};

export default Confirmation;
