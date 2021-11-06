import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "../css/PostFeed.css";
import { selectUser } from '../features/userSlice';
import db from '../Firebase';
import firebase from 'firebase';
import Modal from 'react-modal';
import {selectQuestionId, setQuestionInfo} from "../features/questionSlice";

function PostFeed({Id, question, timestamp, users }) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [IsmodalOpen, setIsModalOpen] = useState(false);
    const questionId = useSelector(selectQuestionId);
    const [answer, setAnswer] = useState("");
    const [getAnswers, setGetAnswers] = useState([]);

    useEffect(() => {
        if(questionId){
            db.collection("questions")
            .doc(questionId)
            .collection("answer")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setGetAnswers(
                snapshot.docs.map((doc) => ({id: doc.id, answers: doc.data()}))
                )
            );
        }
    }, [questionId]);

    const handleAnswer = (e) => {
        e.preventDefault();
    
        if (questionId) {
          db.collection("questions").doc(questionId).collection("answer").add({
            user: user,
            answer: answer,
            questionId: questionId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        console.log(questionId);
        setAnswer("");
        setIsModalOpen(false);
      };

    return(
        <div className="post-feed" onClick={() =>
            dispatch(
              setQuestionInfo({
                questionId: Id,
                questionName: question,
              })
            )
          }
        >
            <div className="post-feed-info">
      
                <h5> Asked By {users.displayName ? users.displayName : users.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            <div className="post-feed-body">
                <div className="post-feed-question">
                    <p>{question}</p>
                    <button 
                    onClick={() => setIsModalOpen(true)} 
                    ClassName="post-feed-button"
                    >Answer
                    </button>
                    <Modal
                          isOpen={IsmodalOpen}
                          onRequestClose={() => setIsModalOpen(false)}
                          shouldCloseOnOverlayClick={false}
                          style={{
                            overlay: {
                              width: 500,
                              height: 300,
                              backgroundColor: "rgba(0,0,0,0.8)",
                              zIndex: "1000",
                              top: "50%",
                              left: "50%",
                              marginTop: "-250px",
                              marginLeft: "-350px",
                            },
                          }}
                        >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by{" "}
                <span className="name">
                  {users.displayName ? users.displayName : users.email}
                </span>{" "}
                {""}
                on{" "}
                <span className="name">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="sumbit" onClick={handleAnswer} className="add">
                Add Answer
              </button>
            </div>
          </Modal>
                </div>
                <div className="post-feed-answer">
                {getAnswers.map(({ id, answers }) => (
            <p key={id} style={{ position: "relative", paddingBottom: "10px" }}>
              {Id === answers.questionId ? (
                <span>
                  {answers.answer}
                  <br />
                  <span
                    style={{
                      
                      color: "gray",
                      fontSize: "small",
                      display: "flex",
                      right: "0px",
                    }}
                  >
                    <span style={{ color: "#b92b27" }}>
                      {answers.user.displayName
                        ? answers.user.displayName
                        : answers.user.email}{" "}
                      on{" "}
                      {new Date(answers.timestamp?.toDate()).toLocaleString()}
                    </span>
                  </span>
                </span>
              ) : (
                ""
              )}
            </p>
          ))}
                </div>
                <div className="post-feed-footer">
                    <div className="post-feed-footer-action">

                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default PostFeed;