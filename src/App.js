import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Login from "./Login";
import Checkout from "./Checkout";
import Payment from "./Payment";
import { useStateValue }  from "./StateProvider";
import { auth } from "./firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe('pk_test_51HbPFTLDSvWIoAxqIqfucZO08Uh0QI7m5sNbdsjH1wKreCsZ2Towi8Y9nzVtPOwgje78UN5rEv4hUSh8U5J1m8or00scKu1yZV');

function App() {

  const [{ user }, dispatch] = useStateValue();
 // this is a code that runs based on a given condition
 // it is called a useEffect hook

    // useEffect will only run once when the app component loads...
   useEffect(() => {

    //this is a listener 
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("AUTH USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      //Any cleanup operations go in here
      unsubscribe();
    };
  }, []);

  console.log("NAME of user: ", user);

  return (
  <Router>
  <div className="app">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>
        <Route path="/checkout">
          <Header />
          <Checkout />
          </Route>
          <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
          <Payment />
          </Elements>
        </Route>
        <Route path="/">
          <Header />
          <Home />
        </Route>
      </Switch>
  </div>
  </Router>
  );
}


export default App;
