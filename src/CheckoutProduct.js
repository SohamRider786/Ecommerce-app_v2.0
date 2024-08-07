import React from 'react'
import './CheckoutProduct.css'
import {useStateValue} from './StateProvider'
function CheckoutProduct({id,title,image,price,rating,hideButton}) {
    const [{basket},dispatch]=useStateValue();
    const removefromcart = ()=>
    {
        dispatch
        (
            {
            type:"REMOVE_FROM_CART",
            item:
            {
                id:id,
            },
        })
    }
  return (
    <div className='checkoutProduct'>
        <img className='checkoutProduct__image' src={image} alt="" />
        <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}</p>
            <p className='checkoutProduct__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='checkoutProduct__rating'>
                {Array(rating).fill().map(()=>(
                    <p>⭐</p>
                ))}
            </div>
            {!hideButton&&(<button onClick={removefromcart}>Remove From Cart</button>)}
        </div>
    </div>
  )
}

export default CheckoutProduct