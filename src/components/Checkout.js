import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useHistory } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  useEffect(() => {
    if (cart?.id) {
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

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  const Form = () =>
    activeStep === 0 ? (
      <CheckoutForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  return (
    <section className="checkout">
      <div className="content-wrapper">
        <h1 className="checkout__title">Checkout</h1>
        <div className="checkout__stepper">
          <h3 style={{ color: activeStep >= 0 ? "black" : "" }}>
            Shipping Address
          </h3>
          <h3 style={{ color: activeStep > 0 ? "black" : "" }}>
            Payment Details
          </h3>
        </div>
        {activeStep === steps.length ? (
          <Confirmation order={order} error={error} isFinished={isFinished} />
        ) : (
          checkoutToken && <Form />
        )}
      </div>
    </section>
  );
};

export default Checkout;
