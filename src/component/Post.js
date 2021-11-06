import React, { useEffect, useState } from 'react';
import "../css/Post.css";
import db from '../Firebase';
import PostBox from './PostBox';
import PostFeed from './PostFeed';



function Post() {

    const [posts, setPosts] = useState([]);

    useEffect(() =>{
        db.collection('questions')
        .orderBy('timestamp','desc')
        .onSnapshot(snapshot => 
            setPosts(
                snapshot.docs.map((doc) =>({
            id: doc.id,
            questions: doc.data()
            }))
           )
        );
    },[]);
    return (
    <div className="post">
        <PostBox />
        {
            posts.map(({ id, questions }) => (
            <PostFeed
              key={id}
              Id={id}
              question={questions.question}
              timestamp={questions.timestamp}
              users={questions.user}
            />
          ))}
        </div>
    );
}

export default Post;
