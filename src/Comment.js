import React from "react";
import Replies from "./Replies";

export default function Comment(props) {
  const { score, userPic, username, timeAdded, content, replies, replyingTo } =
    props;

  return (
    <article className="comment">
      <div>
        <div className="comment__score-controls-wrapper">
          <div className="comment__score-controls">
            <button /*onClick={incrementScore}*/>+</button>
            <p>{score}</p>
            <button /*onClick={decrementScore}*/>-</button>
          </div>
        </div>
      </div>
      <div>
        <div className="comment__header">
          <img className="comment__user-pic" src={userPic} />
          <span className="comment__username">{username}</span>
          <span className="comment_time-added">{timeAdded}</span>
          <button className="comment__reply-button" /*onClick={addReply}*/>
            Reply
          </button>
        </div>
        <p>
          <span>{replyingTo && `@${replyingTo} `}</span>
          {content}
        </p>
        {replies && <Replies replies={replies} />}
      </div>
    </article>
  );
}
