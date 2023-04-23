import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { NavLink } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const promise = loadStripe(
  "pk_test_51MveoXSByirfOpaILt0SrLkL6qwdHRuKTaA62olrZLvzELvEyVkx9CaIsZh1VmTeKBxWDHSpRsXkPKvaln42A9LB00pKoA6jzS"
);

const Wrapper = (props) => (
  <Elements stripe={promise}>
    <Payment {...props} />
  </Elements>
);

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  // const stripe = useStripe();
  // const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(()=>{
    const getClientSecret = async()=>{
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket)*100}`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  },[basket])

  const handleSubmit = async(e) => {
    e.preventDefault();
    setProcessing(true)

   

  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <Elements stripe={promise}>
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout(<NavLink to="/checkout">{basket?.length} items</NavLink>)
          </h1>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>XYZ My address</p>
              <p>Delhi, India (124001)</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review Items And Delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              {/* stripe magic will go here */}
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
              </form>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;