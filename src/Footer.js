import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
function Footer() {
  return (
    <div className='Footer__container'>
            
        <Link to='/'>
            <div className='Footer__top'>Back to Top
            </div>
        </Link>
        <div className='Footer__down'>
               <ul className='Footer__one'>
               <p>Get to Know Us</p>
                <a>About Us</a>
                <a>Careers</a>
                <a>Press Releases</a>
                <a>Amazon Science</a>

               </ul>
               <ul className='Footer__two'>
                <p>Connect with Us</p>
                <a>Facebook</a>
                <a>Twitter</a>
                <a>Instagram</a>
               </ul>
               <ul className='Footer__three'>
                <p>Make Money with Us</p>
                <a>Sell on Amazon</a>
                <a>Sell under Amazon Accelerator</a>
                <a>Protect and Build Your Brand</a>
                <a>Amazon Global Selling</a>
                <a>Become an Affiliate</a>
                <a>Fulfilment by Amazon</a>
                <a>Advertise Your Products</a>
                <a>Amazon Pay on Merchants</a>
               </ul>
               <ul className='Footer__four'>
                <p>Let Us Help You</p>
                <a>Amazon and COVID-19</a>
                <a>Your Account</a>
                <a>Your Orders</a>
                <a>Shopping Help</a>
                <a>Contact Us</a>
               </ul>
        </div>
    </div>
  )
}

export default Footer