import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from 'react-router-dom';


export const Register = () => {

  const [err, setErr] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //Create the userchats database inside firestore database
            await setDoc(doc(db,"userChats",res.user.uid),{});
            //after signup redirect to home page
            navigate("/login");

          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    }
    catch (err) {
      setErr(true);
    }

  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Rapid Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' required />
          <input type="email" placeholder='email' required/>
          <input type="password" placeholder='password' pattern=".{8,}" required title="Password length should be 8 characters or more."/>
          <input style={{ display: "none" }} type="file" id='file' required accept=".jpg,.jpeg,.png"/>
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You do have an acoount?<Link to="/login" >Login</Link></p>
      </div>
    </div>
  )
}
