import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import FormInput from "./FormInput";

const CheckoutForm = ({ checkoutToken, shippingData, nextStep }) => {
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

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisons(shippingCountry);
  }, [shippingCountry]);

  const handleSubmit = () => {};

  console.log(shippingCountries);

  return (
    <form className="checkout__form" onSubmit={handleSubmit}>
      <h2 className="checkout__form-title">Shipping Address</h2>
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
            <option value={item.id}>{option.label}</option>
          ))}
      </select>
      <div>
        <Link to="/cart">Back to Cart</Link>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
