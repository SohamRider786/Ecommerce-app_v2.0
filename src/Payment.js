import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link,useNavigate } from 'react-router-dom';
import { CardElement,useStripe,useElements  } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';
function Payment() {
    const navigate=useNavigate();
    const [{basket,user},dispatch]=useStateValue();
    const stripe=useStripe();
    const elements=useElements();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setClientSecret]=useState("");
    useEffect(()=>{
        //generate client secret to charge money from the customer
        const getClientSecret=async ()=>{
            const response=await axios({
                method:"post",
                //stripe expects the total in a currencies subunits ie cents for dollars
                url:`/payments/create?total=${getCartTotal(basket)*100}`,
            })
            setClientSecret(response.data.clientSecret);
        
        }
        getClientSecret();
    },[basket])
    console.log("THE SECRET IS >>> ",clientSecret);
    const handleSubmit=async (e)=>
    {
        e.preventDefault();
        setProcessing(true);
        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then((info)=>{
            let paymentIntent=info.error.payment_intent;
            console.log("the payment intent is:",paymentIntent);
            db.collection('users')//using noSQL data structure
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)//causing some error
              .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
              })
            setSucceeded(true);//paymentintent is the payment confirmation
            setError(null);
            setProcessing(false);
            dispatch({
                type:'EMPTY_CART',
            });
            navigate('/orders',{replace:true});
        })
    }
    const handleChange=(event)=>
    {
        //listen for changes in the card element
        //display errors based on change 
        setDisabled(event.empty);
        setError(event.error?event.error.message:"");
    }
  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout ( <Link to='/checkout'>{basket?.length} items</Link>)</h1>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p className='user__details'>{user?.email}</p>
                    <p className='user__address'>1019,Purba Sinthee Road</p>
                    <p className='user__address'>Dum Dum, Kolkate-700030</p>
                </div>
            </div>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item=>(
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
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe magic will go here  */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                        <CurrencyFormat 
                            renderText={(value)=>(
                            <>
                            <p>
                                Order Total : <strong>{value}</strong>
                            </p>
                            <small className='subtotal__gift'>
                            </small>
                            </>
                            )}
                            decimalScale={2}
                            value={getCartTotal(basket)}//hw
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                        />
                        <button disabled={disabled || processing||succeeded}>
                            <span>{processing? <p>Processing</p>:"Buy Now"}</span>
                        </button>
                        </div>
                        <div>
                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment