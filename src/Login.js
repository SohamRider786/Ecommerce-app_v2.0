import React ,{useState} from 'react'
import './Login.css'
import {auth} from "./firebase"
import { Link ,useNavigate} from 'react-router-dom';
function Login() {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const loginHandler=e=>{
        e.preventDefault();
        //firebase shit
    }
    const signin = e=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
            .then((auth)=>{
                if(auth){
                    navigate('/');
                }
            })
            .catch((error)=>(alert(error.message)));
    }
    const register =e=>{
        e.preventDefault();
        //register shit
        auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                //sucessfull registration
                if(auth){
                    navigate('/');
                }
                console.log(auth);
            })
            .catch((error)=>(alert(error.message)));
    }
const emailHandler=(e)=>{
    setEmail(e.target.value);
}
const passwordHandler=(e)=>{
    setPassword(e.target.value);
}
console.log(email,password);
console.log(error);
  return (
    <div className='login'>
        <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt="" 
                />
        </Link>
        <div className='login__container'>
            <h1>Sign-In</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text'value={email} onChange={e=>setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>
                <button type='submit' className='login__signInButton' onClick={signin}>Sign In</button>
            </form>
            <p>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login