import React, { useContext, useRef, useState } from 'react';
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {InputContext} from "../context/InputContext"
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const Input = () => {

  const [text,setText]=useState("");
  const [img,setImg]=useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const fileInputRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { checkBlankMsg,setCheckBlankMsg } = useContext(InputContext);

  const handleSend= async()=>{
    
    if(img){
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img:downloadURL
            }),
          });
        });
      });
    }
    else if(text){
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    else{
      setCheckBlankMsg(true);
      setTimeout(() => {
        setCheckBlankMsg(false);
      }, 400);
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp()
    });

    setText("");
    setImg("");
    setUploadSuccess(false);
    fileInputRef.current.value = "";
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setUploadSuccess(true);
  };

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className="send">
        <input type="file" style={{display:"none"}} id='file'onChange={handleFileChange} ref={fileInputRef}/>
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button className={`send-button ${checkBlankMsg ? 'vibrating' : ''}`} onClick={handleSend} >Send</button>
      </div>
      {uploadSuccess && <span>Image uploaded successfully!</span>}
    </div>
  )
}
