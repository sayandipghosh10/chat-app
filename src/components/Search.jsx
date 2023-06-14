import React, { useContext, useState } from 'react';
import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { InputContext } from '../context/InputContext';

export const Search = () => {
  const [userTypedName, setTypedUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const{currentUser}=useContext(AuthContext);

  const handleSearch = async () => {
    // Create a query against the collection. 
    const q = query(collection(db, "users"), where("displayName", "==", userTypedName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch (err) {
      setErr(true);
    }

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect=async()=>{
    //check whether the chats in firestore exists, if not then create
    const combinedId= currentUser.uid>user.uid?currentUser.uid+user.uid:user.uid+currentUser.uid;  

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
      }
    } catch (err) {}

    setUser(null);
    setTypedUserName("");

  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={(e) => setTypedUserName(e.target.value)} value={userTypedName}/>
      </div>
      
      {user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>     
      }
      {err && <span>User not found!</span>}
    </div>
  )
}
