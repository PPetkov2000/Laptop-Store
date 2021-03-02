import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import FormInput from "./FormInput";

const CheckoutForm = ({ checkoutToken, setShippingData, nextStep }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubdivisons = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country,
        region: stateProvince,
      }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisons(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const handleSubmit = (data) => {
    setShippingData({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });
    nextStep();
    console.log(data);
  };

  return (
    <form className="checkout__form" onSubmit={handleSubmit}>
      <h2 className="checkout__form-title">Shipping Address</h2>
      <div className="checkout__form-fields">
        <FormInput name="firstName" placeholder="First name" />
        <FormInput name="lastName" placeholder="Last name" />
        <FormInput name="email" placeholder="Email" />
        <FormInput name="address" placeholder="Address" />
        <FormInput name="city" placeholder="City" />
        <FormInput name="postalCode" placeholder="Postal code" />
        <select
          value={shippingCountry}
          onChange={(e) => setShippingCountry(e.target.value)}
        >
          {Object.entries(shippingCountries)
            .map(([code, name]) => ({
              id: code,
              label: name,
            }))
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.label.slice(0, 31)}
              </option>
            ))}
        </select>
        <select
          value={shippingSubdivision}
          onChange={(e) => setShippingSubdivision(e.target.value)}
        >
          {Object.entries(shippingSubdivisions)
            .map(([code, name]) => ({
              id: code,
              label: name,
            }))
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
        </select>
        <select
          value={shippingOption}
          onChange={(e) => setShippingOption(e.target.value)}
        >
          {shippingOptions
            .map((option) => ({
              id: option.id,
              label: `${option.description} - (${option.price.formatted_with_symbol})`,
            }))
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
        </select>
      </div>
      <div className="checkout__form-actions">
        <Link
          to="/cart"
          className="checkout__form-back-button button-primary-darker"
        >
          Back to Cart
        </Link>
        <button
          type="submit"
          className="checkout__form-submit-button button-secondary"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
