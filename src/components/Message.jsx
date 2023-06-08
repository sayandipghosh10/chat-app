import React from 'react'

export const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        <img src="https://cdn.pixabay.com/photo/2016/08/18/05/05/mark-twain-1602117_1280.jpg" alt="user picture" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src="https://cdn.pixabay.com/photo/2016/08/18/05/05/mark-twain-1602117_1280.jpg" alt="" />
      </div>
    </div>
  )
}
