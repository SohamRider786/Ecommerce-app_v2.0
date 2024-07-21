
// import './App.css';
// import Header from './Header';
// import Home from './Home';
// import Checkout from './Checkout';
// import Login from './Login';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { useEffect } from 'react';
// import { auth } from './firebase';
// import { useStateValue } from './StateProvider';
// import Footer from './Footer';
// import Payment from './Payment';
// import SearchResults from './SearchResults';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import Orders from './Orders';
// const promise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
// function App() {
//   const [{basket},dispatch] = useStateValue();
//   useEffect(() => {
//     //run only once
//     auth.onAuthStateChanged(authUser => {
//       console.log("the user is>> ",authUser);
//       if(authUser){
//         //user logged in
//         dispatch({
//           type:'SET_USER',
//           user:authUser
//         })
//       }
//       else{
//         //user logged out
//         dispatch({
//           type:'SET_USER',
//           user:null
//         })
//       }
//     })
//   },[])
//   return (
//     //BEM
//     <Router>
//       <div className="app">
//         <Routes>
//         <Route path="/orders" element={<>
          
//           <Header />
//           <Orders/>
//           <Footer />
//         </>
//           } />
//           <Route path="/search/:input" element={<>
//             <Header />
//             <SearchResults />
//             <Footer />
//           </>} />
//           <Route path="/login" element={
//           <Login />
//           } />
//           <Route path="/checkout" element={<>
//             <Header />
//             <Checkout />
//             <Footer />
//           </>} />
//           <Route path="/payment" element={<>
//             <Header />
//             <Elements stripe={promise}>
//             <Payment />
//             </Elements>
//             <Footer />
//           </>} />
//           <Route path="/" element={<>
//             <Header />
//             <Home />
//             <Footer />
//           </>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
// export default App;
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Footer from './Footer';
import Payment from './Payment';
import SearchResults from './SearchResults';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // run only once
    auth.onAuthStateChanged(authUser => {
      console.log("the user is >> ", authUser);
      if (authUser) {
        // user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        // user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, [dispatch]);

  const AuthRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/orders" element={
            <AuthRoute>
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            </AuthRoute>
          } />
          <Route path="/search/:input" element={
            <>
              <Header />
              <SearchResults />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={
            <AuthRoute>
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            </AuthRoute>
          } />
          <Route path="/payment" element={
            <AuthRoute>
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
                <Footer />
              </>
            </AuthRoute>
          } />
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
