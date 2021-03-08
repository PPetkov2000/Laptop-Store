import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderReview from "./OrderReview";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  nextStep,
  onCaptureCheckout,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstname,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address,
          town_city: shippingData.city,
          country: shippingData.shippingCountry,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.postalCode,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };

  return (
    <div className="payment-method">
      <OrderReview checkoutToken={checkoutToken} />
      <div className="payment-method__wrapper">
        <h3 className="payment-method__title">Payment Method</h3>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
                className="payment-method__form"
              >
                <CardElement />
                <div className="payment-method__form-actions">
                  <button
                    className="payment-method__form-back-button button-primary-darker"
                    onClick={backStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="payment-method__form-submit-button button-secondary"
                    disabled={!stripe}
                  >
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
