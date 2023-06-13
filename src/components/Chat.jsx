import React, { useContext } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';

export const Chat = () => {

  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
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
