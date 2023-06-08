import React from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from './Messages';
import { Input } from './Input';

export const Chat = () => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>jane</span>
        <div className="chatIcons">
          <img src={Cam} alt="camera icon" />
          <img src={Add} alt="add icon" />
          <img src={More} alt="more icon" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
