import React, { useState, useEffect }from 'react';
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from './axios';


function Payment() {

    const [{ basket, user, }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    // for submit button
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceded] = useState(false);
    //this is used so that you can charge the client
    const [clientSecret, setClientSecret] = useState(true);
    
    useEffect(() => {
        // generate stripe secret api which allows us to charge the client
        const getClientSecret = async () => {
            //axios is a request
            const response = await axios({
                method: 'post',
                //submits how much you will be deducting the client
                //stripe expects that we send them sub units so we multiply the dollah with a 100 "$1=c100"
                url: `payments/create?total=${getBasketTotal(basket) * 100}`

            });
            console.log({getBasketTotal});
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log("here's the secret API =====>", clientSecret)

    const handleSubmit = async (event) => {
        //stripe integration
        event.preventDefault();
        setProcessing(true);
    

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({ paymentIntent }) => {
        //this is gonna be the payment confirmation

        //paymentIntent =   payment confirmation

        setSucceded(true);
        setError(null)
        setProcessing(false)
        
        dispatch({
            type: "EMPTY_BASKET"
        })
        history.replace('/orders')

    })
}

    const handleChange = event => {
        //Listen to changes in the button
        //display errors when not the correct card
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    
    return (
        <div className="payment">
            <div className="payment__container">

                <h1 onClick={e => history.push("/checkout")}>
                        Checkout ({basket.length} items)
                 </h1>

            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>Hello {user?.email}!</p>
                    <p>Gorodo Avenue Cebu</p>
                    <p>City Philippines 6000</p>
                </div>
             </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
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
                            {/* this is where stripe is coded */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
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
                            </form>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
