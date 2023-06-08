import React from 'react'

export const Login = () => {
  return (
    <div  className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Rapid Chat</span>
            <span className='title'>Register</span>
            <form action="">
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>         
                <button>Sign in</button>
            </form>
            <p>You don't have an acoount? Register</p>
        </div>
    </div>
  )
}
