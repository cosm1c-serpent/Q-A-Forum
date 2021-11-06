import React, { useEffect } from 'react';
import {useSelector} from "react-redux"
import Forum from './component/Forum';
import Login from './component/auth/Login';
import {login, logout, selectUser } from "./features/userSlice";
import { useDispatch } from 'react-redux';
import { auth } from './Firebase';
//import './App.css';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      }else{
       dispatch(logout());
    }
    });
  },[dispatch]);

  return (
    <div className="App">
      {
        user ? (<Forum />) : (<Login />)
      }
    </div>
  );
}

export default App;
