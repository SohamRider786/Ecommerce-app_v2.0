import React, { useState } from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link ,useNavigate} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() 
{
const [{ basket,user },dispatch]=useStateValue();
const[input,setInput]=useState('');
const navigate=useNavigate();
const handleChange=(input)=>{
    setInput(input);

}
const handleAuth=()=>{
    if(user){
        auth.signOut();
    }
}
  return (
    <div className='header'>
        <Link to="/">
            <img className='header__logo' src='https://m.media-amazon.com/images/G/01/prime/marketing/slashPrime/prime_logo_White._CB646659517_.png' />
        </Link>
        <div className='header__search'>
            <input className='header__searchInput' type='text' placeholder='Search products...' value={input} onChange={(e)=>{handleChange(e.target.value)}}/>
            <SearchIcon className='header__searchIcon' onClick={() => navigate(`/search/${input}`)} />
        </div>
        <div className='header__nav'>
            <Link to={!user&&"/login"}>
                <div className='header__option'onClick={handleAuth}>
                    <span className='header__optionLineOne'>Hello  {user? user.email:'Guest'}</span>
                    <span className='header__optionLineTwo' >{user ? 'Sign Out':'Sign In'}</span>
                </div>
            </Link>
            <Link to='/orders'>
            <div className='header__option'>
               <span className='header__optionLineOne'>Returns</span>
               <span className='header__optionLineTwo'>& Orders</span>
            </div> 
           </Link>
           <div className='header__option'>
               <span className='header__optionLineOne'>Your</span>
               <span className='header__optionLineTwo'>Prime</span>
           </div> 
           <Link to="/checkout">
                <div className='header__Basket'>
                    <ShoppingBasketIcon className='header__optionLineOne'/>
                    <span className='header__optionLineTwo'>{basket?.length}</span>
                </div>
           </Link>
        </div>
    </div>
  )
}

export default Header