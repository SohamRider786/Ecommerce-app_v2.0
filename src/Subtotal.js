import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'; 
import { useStateValue } from './StateProvider';
import { getCartTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
function Subtotal() {
  const navigate=useNavigate();
  const [{ basket },dispatch]=useStateValue();
  return (
    <div className='subtotal'>
        <CurrencyFormat 
        renderText={(value)=>(
            <>
            <p>
                Subtotal ({basket.length} items): <strong>${getCartTotal(basket)}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type="checkbox"/> This order contains a gift
            </small>
            </>
        )}
        decimalScale={2}
        value={getCartTotal(basket)}//hw
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
        <button onClick={(e)=>navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal