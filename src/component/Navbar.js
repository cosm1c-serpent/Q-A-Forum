import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../css/Navbar.css";
import { Input } from '@material-ui/core';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../Firebase';
import Modal from 'react-modal';
import firebase from 'firebase';


function Navbar() {

    const user = useSelector(selectUser)
    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState("")

    const handleQuestion = (e) => {
        e.preventDefault()

        setOpenModal(false)

        db.collection('questions').add({
            question: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user
        })

        setInput("")
    }

    return (<div className="navbar">
    <div className="header"><h3> ONLINE PROGRAMMERS FORUM</h3>
        <div className="header-logout">
        <button onClick={() => auth.signOut()}>Logout</button>
            </div>
            <div className="header-question">
                <button onClick = {() => setOpenModal(true)}>Add Question</button>
                <Modal 
                isOpen = {openModal} 
                onRequestClose = {() => setOpenModal(false)}
                shouldCloseOnOverlayClick = {false}
                style = {{
                    overlay: {
                        width: 500,
                        height: 270,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        zIndex: "1000",
                        top: "50%",
                        left: "60%",
                        marginTop: "-300px",
                        marginLeft: "-350px",
                    },
                }}
                >
                    <div className="modal-title">
                        <h5>Add Question</h5>
                        <div className="modal-info">
                            <p>{user.displayName ? user.displayName : user.email} asked</p>
                        </div>
                    </div>
                    <div className="modal-text">
                         <Input 
                            required
                            value = {input}
                            onChange = {(e) => setInput(e.target.value)}
                            type ="text"
                            placeholder = "write your Question here...."
                        />
                    {/* <textarea required id="input" rows="4" cols="50" required placeholder ="write your Question here...."></textarea> */}
                    </div>
                    <button onClick = {() => setOpenModal(false)}
                    >Close</button>
                    <button type="submit" onClick = {handleQuestion}
                    >Post Question</button>
                </Modal>
            </div>
        
        </div>
    </div>
    )
}

export default Navbar;