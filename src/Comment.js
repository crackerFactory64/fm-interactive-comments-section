import React from "react";
export default function Comment(props) {
  const { score, userPic, username, timeAdded, content, replies } = props;
  return (
    <article className="comment">
      <div>
        <div className="comment__score-controls">
          <button /*onClick={incrementScore}*/>+</button>
          <p>{score}</p>
          <button /*onClick={decrementScore}*/>-</button>
        </div>
      </div>
      <div>
        <div className="comment__header">
          <img className="comment__user-pic" src={userPic} />
          <span className="comment__username">{username}</span>
          <span>{timeAdded}</span>
          <button className="comment__reply-button" /*onClick={addReply}*/>
            Reply
          </button>
        </div>
        <p>{content}</p>
        {/*replies*/}
      </div>
    </article>
  );
}
