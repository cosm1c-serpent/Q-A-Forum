import React from 'react';
import { useSelector } from 'react-redux';
import "../css/PostBox.css"
import { selectUser } from '../features/userSlice';

function PostBox() {
    const user = useSelector(selectUser);
    return (
        <div className="postbox">
            <div className="postbox-info">
        
            </div>
            <div className="postbox-question">
                <p>Hi, {user.displayName} Post your Question?</p>
            </div>
        </div>
    )
    
}

export default PostBox;