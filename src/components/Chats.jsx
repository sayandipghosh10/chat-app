import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';


export const Chats = () => {

  const [chats, setChats] = useState([]);
  
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {

    if (currentUser.uid) {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unSub();
      }
    } 

  }, [currentUser.uid]);

  const handleSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u});
  }
 

  return (
    <div className='chats' id='scrollForChats'>

      {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
    
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt={`${chat[1].userInfo.displayName}'s picture`} />
          <div className="userChatInfo">
            <span>{chat[1]?.userInfo?.displayName}</span>
            <p>{chat[1]?.lastMessage?.img1?<FontAwesomeIcon icon={faCameraRetro} />:chat[1]?.lastMessage?.text}</p>
          </div>
        </div>

      ))}

    </div>
  )
}
