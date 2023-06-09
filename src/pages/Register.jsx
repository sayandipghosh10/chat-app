import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {

  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(email, password,displayName,file);
    try {

      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      const storageRef = ref(storage, displayName);
      console.log("before point");
      // Get the download URL
      const downloadUrl=await getDownloadURL(storageRef);
      console.log("point");
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadUrl,
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
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />
          <input style={{ display: "none" }} type="file" id='file' />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You do have an acoount? Login</p>
      </div>
    </div>
  )
}
