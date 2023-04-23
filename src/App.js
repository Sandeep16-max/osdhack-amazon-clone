import { useEffect } from "react";
import "./App.css";
import Login from "./Login"
import Header from "./Header";
import Home from "./Home";
import Payment from "./Payment"
import Checkout from "./Checkout"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";



function App() {
  const[{},dispatch] = useStateValue()
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log('THE USER IS >>>', authUser);
      if(authUser){
        // user is logged in our just logged in 
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      }
      else{
        // the user is logged out 
        dispatch({type: "SET_USER",
        user: null
      })
      }
    })
  },[])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
