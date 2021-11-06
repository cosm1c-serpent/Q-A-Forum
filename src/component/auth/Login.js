import React from 'react';
import { useState } from "react";
import { auth, provider } from "../../Firebase";
import "./Login.css";

 function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => {
            alert(e.message);
        });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .then((auth) => {
            console.log(auth);
          })
          .catch((e) => alert(e.message));
      };
    
      const registerSignIn = (e) => {
        e.preventDefault();
    
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((auth) => {
            if (auth) {
              console.log(auth);
            }
          })
          .catch((e) => alert(e.message));
      };


     return (
        <div className="login">
              <img
                className="login__google"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""/>
                <button onClick={signIn}>Continue With Google</button> 
                <br></br> 
                <h4>Login with Email</h4>
                <div className="login__email">
              
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />

            <div className="login__button">
              <button onClick={handleSignIn}>Login</button>
              <button onClick={registerSignIn}>Register</button>
            </div>
        </div>
      </div> 
     );
 }

 export default Login;