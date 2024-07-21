import React from 'react'
import './Card.css'
import { useStateValue } from './StateProvider';
function Card({id,title,image,price,rating}) {
  const [{basket},dispatch] = useStateValue();
   console.log(basket);
  const addtocart =()=>{
    //dispatch item into the data layer
    dispatch
    ({
        type:"ADD_TO_CART",
        item:{
          id:id,
          title:title,
          image:image,
          price:price,
          rating:rating,
        }, 
    })
  }
  console.log(id);
  console.log(title);
  console.log(image);
  console.log(price);
  console.log(rating);
  return (
    <div className='card'>
        <img className='card__image' src ={image}/>
        <div className='card__info'>
            <p className='card__title'>{title}</p>
            <p className='card__price'>
              <small>$</small>
                <strong>{price}</strong>
            </p>
          <div className='card__rating'>
            {Array (rating).fill().map (()=>(
              <p>⭐</p>
              ))}
          </div>
          <button className='card__button' onClick={addtocart} >Add to Cart</button>
        </div>
    </div>
  )
}

export default Card