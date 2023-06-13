import React, { useContext, useEffect, useState } from 'react'
import { Message } from "./Message.jsx";
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';


export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if(doc.exists()){
        setMessages(doc.data().messages);
      };   
    });
    return ()=>{
      unSub();
    }
  }, [data.chatId])

  return (
    <div className='messages' id='msg'>
      
      {messages.map((m) => (
        <Message message={m} key={m.id}/>
      ))}

    </div>
  )
}
