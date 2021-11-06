import React from 'react';
import Navbar from './Navbar';
import Post from './Post';
import "../css/Forum.css";

function Forum() {
    return (<div className="forum">    
               <Navbar />
               <div className="forum-content">
                   <Post />
                </div>
            </div>
    )
}

export default Forum;

