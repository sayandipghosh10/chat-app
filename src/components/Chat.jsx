import React, { useContext } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import { Messages } from './Messages';
import { Input } from './Input';
import { ChatContext } from '../context/ChatContext';
import { InputContext } from '../context/InputContext';

export const Chat = () => {

  const { data } = useContext(ChatContext);
  const {checkUserSelectOrNotBasedOnInputComponentShow,setCheckUserSelectOrNotBasedOnInputComponentShow} =useContext(InputContext);
  if(data.user?.displayName){
    setCheckUserSelectOrNotBasedOnInputComponentShow(true);
  }
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
      {checkUserSelectOrNotBasedOnInputComponentShow && <Input/>}     
    </div>
  )
}
