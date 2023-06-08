import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Rapid Chat</span>
      <div className="user">
        <img src="https://cdn.pixabay.com/photo/2016/08/18/05/05/mark-twain-1602117_1280.jpg" alt="" />
        <span>John</span>
        <button>logout</button>
      </div>
    </div>
  )
}
