import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useHistory } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (error) {
          if (activeStep !== steps.length) history.push("/");
          console.log(error);
        }
      };
      generateToken();
    }
  }, [cart]);

  const Form = () =>
    activeStep === 0 ? (
      <CheckoutForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
      />
    );

  return (
    <div className="checkout">
      <h2 className="checkout__title">Checkout</h2>
      {steps.map((step) => (
        <h3 key={step}>{step}</h3>
      ))}
      {activeStep === steps.length ? (
        <Confirmation />
      ) : (
        checkoutToken && <Form />
      )}
    </div>
  );
};

export default Checkout;
