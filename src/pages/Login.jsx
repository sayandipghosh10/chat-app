import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import { useState } from 'react';


export const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      //for login
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Rapid Chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' required/>
          <input type="password" placeholder='password' required/>
          <button>Sign in</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You don't have an acoount? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
